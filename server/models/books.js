const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    showtime: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "showtimes"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date: {
        type: String,
    },
    seat: [{
        type: String,
    }],
    money: {
        type: String
    },
    food: [{
        name: {type: String},
        price: {type: Number},
        count: {type: Number},
        total: {type: Number},
    }
    ],
});

bookSchema.set('timestamps', true);
const book = mongoose.model('book', bookSchema);

module.exports = book;