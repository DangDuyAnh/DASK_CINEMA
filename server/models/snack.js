const mongoose = require('mongoose');
const {C13, C16, C18, NONE, UP_COMING, NOW_PLAYING} = require('../constants/constants');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: String,
    img: String,
    price: Object,
    desc: String,
    feedback: Array
  });
  
const snack = mongoose.model('snack', schema);
module.exports = snack;