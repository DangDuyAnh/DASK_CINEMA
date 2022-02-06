const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const {GENDER_SECRET} = require("../constants/constants");
const {GENDER_FEMALE} = require("../constants/constants");
const {GENDER_MALE} = require("../constants/constants");

const usersSchema = new Schema({
  email: { 
    type: String, 
    required: true,
    unique: true,
  },
  password: { 
    type: String, 
    required: true,
    max: 255,
    min: 6,
  },
  ten: {
    type: String,
    required: true,
  },
  phonenumber: { 
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: [GENDER_MALE, GENDER_FEMALE, GENDER_SECRET],
    required: true,
    default: GENDER_MALE
  },
  birthday: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

usersSchema.set('timestamps', true);
module.exports = mongoose.model("Users", usersSchema);;
