const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pageviewSchema = new Schema({
    count: { 
        type: Number
      },
    date: { 
        type: String
      },
});

pageviewSchema.set('timestamps', true);
const pageview = mongoose.model("pageview", pageviewSchema);
module.exports = pageview
