const mongoose = require('mongoose');
const {C13, C16, C18, NONE, UP_COMING, NOW_PLAYING} = require('../constants/constants');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String, required: true},
    director: { type: String},
    movieType: { type: String},
    releaseDate: { type: Date},
    duration: {type: String},
    requiredAge: {
      type: String,
      enum: [C13, C16, C18, NONE],
      default: NONE
    },
    poster : {
      type: String,
    },
    trailerVideo: { type: String},
    description: { type: String},
    kind: { 
      type: String,
      enum: [UP_COMING, NOW_PLAYING],
      default: [NOW_PLAYING]
    }
  });
  movieSchema.set('timestamps', true);
  const movie = mongoose.model('movie', movieSchema);
  
  module.exports = movie;