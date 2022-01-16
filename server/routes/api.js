const express = require("express");
const moviesRoutes = require('./Movies');
const showtimesRoutes = require('./Showtimes');
const apiRoutes = express.Router();

apiRoutes.get(
    "/", (req, res) => res.json({ api: "is-working" })
);
apiRoutes.use('/movies', moviesRoutes);
apiRoutes.use('/showtimes', showtimesRoutes);

module.exports = apiRoutes;