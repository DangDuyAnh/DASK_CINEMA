const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
    name: { type: String},
    address: { type: String},
  });

const cinema = mongoose.model('cinema', cinemaSchema);

module.exports = cinema;