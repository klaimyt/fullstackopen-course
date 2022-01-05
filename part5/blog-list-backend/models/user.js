const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: {
    type: String, minlength: 3, required: true, unique: true,
  },
  name: { type: String },
  passwordHash: { type: String, required: true },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  }],
});

userSchema.set('toJSON', {
  /* eslint-disable */
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
  /* eslint-disable */
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;
