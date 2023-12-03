const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types
        .ObjectId,
      ref: 'Note',
    },
  ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (
    document,
    returnedObject
  ) => {
    // eslint-disable-next-line no-param-reassign
    returnedObject.id =
      // eslint-disable-next-line no-underscore-dangle
      returnedObject._id.toString();
    // eslint-disable-next-line no-underscore-dangle, no-param-reassign
    delete returnedObject._id;
    // eslint-disable-next-line no-param-reassign, no-underscore-dangle
    delete returnedObject.__v;
    // eslint-disable-next-line no-param-reassign
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model(
  'User',
  userSchema
);

module.exports = User;
