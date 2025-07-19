const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  refresh_token: {
    type: String
  }
});

userSchema.virtual('fullname').get(function () {
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', userSchema);
