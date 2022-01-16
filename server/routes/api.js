const express = require("express");
const moviesRoutes = require('./Movies');
const snacksRoutes = require('./Snacks');

const showtimesRoutes = require('./Showtimes');
const apiRoutes = express.Router();

apiRoutes.get(
    "/", (req, res) => res.json({ api: "is-working" })
);
apiRoutes.use('/movies', moviesRoutes);
apiRoutes.use('/showtimes', showtimesRoutes);

apiRoutes.use('/snacks', snacksRoutes);

module.exports = apiRoutes;