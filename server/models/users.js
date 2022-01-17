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
  firstname: { 
    type: String, 
    required: true,
  },
  lastname: { 
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
    required: false,
    default: GENDER_SECRET
  },
  birthday: {
    type: Date,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
  },
});

usersSchema.set('timestamps', true);
module.exports = mongoose.model("Users", usersSchema);;
