const BookModel = require('../models/books');
const httpStatus = require("../utils/httpStatus");

const bookController = {};
bookController.create = async (req, res, next) => {
    try {
        let userId = req.userId;
        const {
            showtime,
            date,
            seat,
            money,
            food
        } = req.body;

        const newBook = new BookModel({
            showtime: showtime,
            user: userId,
            date: date,
            seat: seat,
            money: money,
            food: food
        })
        try {
            const savedBook = await newBook.save();
            res.status(httpStatus.CREATED).json({
                book: savedBook
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

bookController.list = async (req, res, next) => {
    try {
        const {
            date,
            showtime
        } = req.body;

        try {
            let books = await BookModel.find({date: date, showtime: showtime})
            res.status(httpStatus.CREATED).json({
                books: books
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

bookController.find = async (req, res, next) => {
    try {
        let userId = req.userId
        try {
            let books = await BookModel.find({user: userId}).sort({"createdAt": -1})
            .populate({
                path: 'showtime',
                model: 'showtime',
                populate: [{ path: 'movie', model: 'movie'}, { path: 'cinema', model: 'cinema'}]
            });
            res.status(httpStatus.CREATED).json({
                books: books
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

module.exports = bookController;