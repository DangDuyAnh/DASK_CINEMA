const express = require("express");
const moviesRoutes = require('./Movies');

const apiRoutes = express.Router();

apiRoutes.get(
    "/", (req, res) => res.json({ api: "is-working" })
);
apiRoutes.use('/movies', moviesRoutes);

module.exports = apiRoutes;