const PageviewModel = require('../models/pageviews');
const httpStatus = require("../utils/httpStatus");

const pageviewController = {};

pageviewController.plusCount = async (req, res, next) => {
    try {
        const {
            date
        } = req.body

        try {

        let pageview = await PageviewModel.findOne({
            date: date
        })

        if (pageview) {
            await PageviewModel.findOneAndUpdate({date: date},{
                count: pageview.count + 1
            })
        } else {
        let newPageview = new PageviewModel({
            count: 1,
            date: date
        })
        await newPageview.save();
        }

        let returnPageview = await PageviewModel.findOne({
            date: date
        })
            return res.status(httpStatus.OK).json({
               pageview: returnPageview
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

pageviewController.get = async (req, res, next) => {
    try {
        const {
            date
        } = req.body
        try {
            let pageview = await PageviewModel.findOne({
                date: date
            })
            return  res.status(httpStatus.OK).json({
               pageview: pageview
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

module.exports = pageviewController;