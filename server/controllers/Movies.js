const MovieModel = require('../models/movies');
const httpStatus = require("../utils/httpStatus");

const moviesController = {};

moviesController.create = async (req, res, next) => {
    try {
        const {
            title,
            director,
            movieType,
            releaseDate,
            duration,
            requiredAge,
            trailerVideo,
            description,
            kind
        } = req.body;

        const newMovie = new MovieModel({
            title: title,
            director: director,
            movieType: movieType,
            releaseDate: releaseDate,
            duration: duration,
            requiredAge: requiredAge,
            trailerVideo: trailerVideo,
            description: description,
            kind: kind,
            poster: 'http://localhost:5000/uploads/images/' + req.files.images[0].filename
        });
        try {
            const savedMovie = await newMovie.save();
            res.status(httpStatus.CREATED).json({
                movie: newMovie
            })
        } catch (e) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: e.message
            });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

module.exports = moviesController