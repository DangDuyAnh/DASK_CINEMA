const mongoose = require("mongoose");

const showtimeSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies"
    },
    cinema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cinemas"
    },
    time: {
        type: String,
    }
});
showtimeSchema.set('timestamps', true);
module.exports = mongoose.model('Showtime', showtimeSchema);