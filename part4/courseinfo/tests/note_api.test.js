const mongoose = require('mongoose');
const supertest = require('supertest');

mongoose.set('bufferTimeoutMS', 30000);

const app = require('../app');
const Note = require('../models/note');

const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});
  const noteObjects =
    helper.initialNotes.map(
      (note) => new Note(note)
    );

  const promiseArray = noteObjects.map(
    (note) => note.save()
  );
  await Promise.all(promiseArray);
}, 100000);

test('all notes are returned', async () => {
  const res = await api.get(
    '/api/notes'
  );

  expect(res.body).toHaveLength(
    helper.initialNotes.length
  );
}, 100000);

test('a specific note is within the returned notes', async () => {
  const res = await api.get(
    '/api/notes'
  );
  expect(
    res.body.map((r) => r.content)
  ).toContain(
    'Browser can execute only Javascript'
  );
}, 100000);

test('a valid note can be added', async () => {
  const newNote = {
    content:
      'async/await simplifies making async calls',
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect(
      'Content-Type',
      /application\/json/
    );

  const notesAtEnd =
    await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length + 1
  );

  const contents = notesAtEnd.map(
    (n) => n.content
  );
  expect(contents).toContain(
    'async/await simplifies making async calls'
  );
}, 100000);

test('note without content is not added', async () => {
  const newNote = {
    important: true,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400);

  const notesAtEnd =
    await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length
  );
}, 100000);

test('a specific note can be viewed', async () => {
  const notesAtStart =
    await helper.notesInDb();
  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect(
      'Content-Type',
      /application\/json/
    );

  expect(resultNote.body).toEqual(
    noteToView
  );
});

test('a note can be deleted', async () => {
  const notesAtStart =
    await helper.notesInDb();

  const noteToDelete = notesAtStart[0];

  await api
    .delete(
      `/api/notes/${noteToDelete.id}`
    )
    .expect(204);

  const notesAtEnd =
    await helper.notesInDb();

  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length - 1
  );
  const contents = notesAtEnd.map(
    (r) => r.content
  );
  expect(contents).not.toContain(
    noteToDelete.content
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});
