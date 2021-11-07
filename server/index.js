const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes/router');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use(router);

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
); 

const uri = 'mongodb+srv://user:a123456@cluster0.m5ghr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
