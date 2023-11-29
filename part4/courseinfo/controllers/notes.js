const notesRouter =
  require('express').Router();

const Note = require('../models/note');

notesRouter.get(
  '/',
  async (req, res) => {
    const notes = await Note.find({});
    res.json(notes);
  }
);

notesRouter.get(
  '/:id',
  async (req, res, next) => {
    try {
      const note = await Note.findById(
        req.params.id
      );
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    } catch (error) {
      next(error);
    }
  }
);

notesRouter.post(
  '/',
  async (req, res, next) => {
    try {
      const { body } = req;
      const note = new Note({
        content: body.content,
        important:
          body.important || false,
      });
      const savedNote =
        await note.save();

      res.status(201).json(savedNote);
    } catch (error) {
      next(error);
    }
  }
);

notesRouter.put(
  '/:id',
  async (req, res, next) => {
    try {
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
    } catch (error) {
      next(error);
    }
  }
);

notesRouter.delete(
  '/:id',
  async (req, res, next) => {
    try {
      const result =
        await Note.findByIdAndDelete(
          req.params.id
        );

      res.status(204).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = notesRouter;
