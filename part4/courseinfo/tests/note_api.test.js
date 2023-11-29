const mongoose = require('mongoose');
const supertest = require('supertest');

mongoose.set('bufferTimeoutMS', 30000);

const app = require('../app');
const Note = require('../models/note');

const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});
  helper.initialNotes.map(
    async (note) => {
      const noteObject = new Note(note);
      await noteObject.save();
    }
  );
});

test('all notes are returned', async () => {
  const res = await api.get(
    '/api/notes'
  );

  expect(res.body).toHaveLength(
    helper.initialNotes.length
  );
});

test('a specific note is within the returned notes', async () => {
  const res = await api.get(
    '/api/notes'
  );
  expect(
    res.body.map((r) => r.content)
  ).toContain(
    'Browser can execute only Javascript'
  );
});

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
});

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
});

afterAll(async () => {
  await mongoose.connection.close();
});
