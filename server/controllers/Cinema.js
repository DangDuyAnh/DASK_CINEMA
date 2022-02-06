const CinemaModel = require('../models/cinemas');
const httpStatus = require("../utils/httpStatus");

const cinemaController = {};

cinemaController.getCinemaList = async (req, res, next) => {
    try {
        const cinemaList = await CinemaModel.find();
        return res.status(httpStatus.OK).json({
            cinemaList: cinemaList
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

cinemaController.getCinema = async (req, res, next) => {
    try {
        let cinemaId = req.params.id
        const cinema = await CinemaModel.findById(cinemaId);
        return res.status(httpStatus.OK).json({
            cinema: cinema
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

module.exports = cinemaController;