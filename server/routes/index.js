const express = require("express");
const router = express.Router();
let User = require('../models/users');
const apiRoutes = require('./api');

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.use("/api", apiRoutes);

module.exports = router;