const ShowTimeModel = require('../models/showtimes');
const movieModel = require("../models/movies");
const cinemaModel = require("../models/cinemas")
const httpStatus = require("../utils/httpStatus");

const showtimeController = {};

showtimeController.create = async (req, res, next) => {
    try {
        const {
            movie,
            cinema,
            time
        } = req.body;

        const newShowtime = new ShowTimeModel({
            movie: movie,
            cinema: cinema,
            time: time,
        });
        try {
            const savedShowtime = await newShowtime.save();
            res.status(httpStatus.CREATED).json({
                movie: savedShowtime
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

showtimeController.find = async (req, res, next) => {
    try {
        let movieId = req.params.id;
        const showtimes = await ShowTimeModel.find({movie: movieId}).populate({
            path: 'cinema',
            model: 'cinema'
        });
        return res.status(httpStatus.OK).json({
            showtimes: showtimes
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
        
}

showtimeController.getList = async (req, res, next) => {
    try {
        const showtimes = await ShowTimeModel.find().populate({
            path: 'cinema',
            model: 'cinema'
        }).populate({
            path: 'movie',
            model: 'movie'
        });
        return res.status(httpStatus.OK).json({
            showtimes: showtimes
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

showtimeController.get = async (req, res, next) => {
    try {
        let showtimeId = req.params.id;
        const showtime = await ShowTimeModel.findById(showtimeId).populate({
            path: 'cinema',
            model: 'cinema'
        }).populate({
            path: 'movie',
            model: 'movie'
        });
        return res.status(httpStatus.OK).json({
            showtimes: showtime
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
        
}

module.exports = showtimeController