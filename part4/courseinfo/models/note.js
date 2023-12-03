const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types
      .ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (
    document,
    returnedObject
  ) => {
    // eslint-disable-next-line no-param-reassign
    returnedObject.id =
      // eslint-disable-next-line no-underscore-dangle
      returnedObject._id.toString();
    //  eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model(
  'Note',
  noteSchema
);
