const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    cinema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cinemas",
    },
    content: {
        type: String,
        required: true,
    }
  });
commentSchema.set('timestamps', true);
const comment = mongoose.model('comment', commentSchema);

module.exports = comment;