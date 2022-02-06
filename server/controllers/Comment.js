const CommentModel = require('../models/comment');
const httpStatus = require("../utils/httpStatus");

const commentController = {};

commentController.create = async (req, res, next) => {
    try {
        let userId = req.userId
        const {
            cinema,
            content
        } = req.body;

        const newComment = new CommentModel({
            user: userId,
            cinema: cinema,
            content: content
        });
        try {
            const savedComment = await newComment.save();
            let returnComment = await CommentModel.findById(savedComment._id).populate({
                    path: 'user',
                    model: 'Users'
            })
            res.status(httpStatus.CREATED).json({
                comment: returnComment
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

commentController.get = async (req, res, next) => {
    try {
        let cinemaId = req.params.id;
        let comments = await CommentModel.find({
            cinema: cinemaId
        }).populate(
            {
                path: 'user',
                model: 'Users'
            }
        ).sort({"createdAt": -1})
        return res.status(httpStatus.OK).json({
            comments: comments
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}
module.exports = commentController;