const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentUser = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const user = mongoose.model('user', studentUser);

module.exports = user;