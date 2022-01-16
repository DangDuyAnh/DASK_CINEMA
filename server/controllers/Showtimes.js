const ShowTimeModel = require('../models/Showtimes');
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

module.exports = showtimeController