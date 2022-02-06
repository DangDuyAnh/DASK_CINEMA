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
const showtime = mongoose.model('showtime', showtimeSchema);
module.exports = showtime;