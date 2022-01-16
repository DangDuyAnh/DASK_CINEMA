const MovieModel = require('../models/movies');
const httpStatus = require("../utils/httpStatus");
const {UP_COMING, NOW_PLAYING} = require('../constants/constants');

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
            poster: '/uploads/images/' + req.files.images[0].filename
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

moviesController.getMovieList = async (req, res, next) => {
    try {
        const movieKind = req.params.movieKind.toUpperCase();

        if (movieKind !== NOW_PLAYING && movieKind !== UP_COMING) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'this kind of movies does not exist'
            });
        }

        const movieList = await MovieModel.find({
            kind : movieKind,
        }).sort({releaseDate: -1})
        return res.status(httpStatus.OK).json({
            movieList: movieList
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

moviesController.getMovie = async (req, res, next) => {
    try {
        const movie = await MovieModel.findById(req.params.id)
        return res.status(httpStatus.OK).json({
            data: movie})
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

module.exports = moviesController