const notesRouter =
  require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Note = require('../models/note');

const getTokenFrom = (req) => {
  const authorization = req.get(
    'authorization'
  );
};

notesRouter.get(
  '/',
  async (req, res) => {
    const notes = await Note.find(
      {}
    ).populate('user', {
      username: 1,
      name: 1,
    });
    res.json(notes);
  }
);

notesRouter.get(
  '/:id',
  async (req, res) => {
    const note = await Note.findById(
      req.params.id
    );
    if (note) {
      res.json(note);
    } else {
      res.status(404).end();
    }
  }
);

notesRouter.post(
  '/',
  async (req, res) => {
    const { body } = req;

    const user = await User.findById(
      body.userId
    );
    console.log('test111', user);

    const note = new Note({
      content: body.content,
      important:
        body.important || false,
      user: user.id,
    });
    const savedNote = await note.save();

    user.notes = [
      ...user.notes,
      savedNote.id,
    ];
    await user.save();

    res.status(201).json(savedNote);
  }
);

notesRouter.put(
  '/:id',
  async (req, res) => {
    const { content, important } =
      req.body;
    const result =
      Note.findByIdAndUpdate(
        res.params.id,
        { content, important },
        {
          new: true,
          runValidators: true,
          context: 'query',
        }
      );

    res.json(result);
  }
);

notesRouter.delete(
  '/:id',
  async (req, res) => {
    const result =
      await Note.findByIdAndDelete(
        req.params.id
      );

    res.status(204).json(result);
  }
);

module.exports = notesRouter;
