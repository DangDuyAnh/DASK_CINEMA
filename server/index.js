require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {MONGO_URI, PORT} = require('./constants/constants');
const mainRouter = require('./routes');

// connect to mongodb
mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(res => {
  console.log("connected to mongodb");
})
  .catch(err => {
      console.log(err);
  })

const app = express();

app.use(cors());
app.use(express.json());

app.use(mainRouter);
app.use('/uploads', express.static('uploads'));

const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
); 
