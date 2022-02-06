const express = require("express");
const moviesRoutes = require('./Movies');
const snacksRoutes = require('./Snacks');
const usersRoutes = require("./Users");
const cinemaRoutes = require('./Cinema');
const bookRoutes = require('./Book');
const commentRoutes = require('./Comment');
const pageviewRoutes = require('./Pageview');

const showtimesRoutes = require('./Showtimes');
const apiRoutes = express.Router();

apiRoutes.get(
    "/", (req, res) => res.json({ api: "is-working" })
);
apiRoutes.use('/movies', moviesRoutes);
apiRoutes.use('/showtimes', showtimesRoutes);
apiRoutes.use("/users", usersRoutes);
apiRoutes.use('/snacks', snacksRoutes);
apiRoutes.use('/cinemas', cinemaRoutes);
apiRoutes.use('/books', bookRoutes);
apiRoutes.use('/comments', commentRoutes);
apiRoutes.use('/pageviews', pageviewRoutes);

module.exports = apiRoutes;