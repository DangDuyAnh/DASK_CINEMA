const Model = require('../models/snack');
const httpStatus = require("../utils/httpStatus");

const controller = {};

controller.list = async (req, res, next) => {
  try {
    let r = await Model.find({})

    if (r != null) {
      return res.status(httpStatus.OK).json(r);
    } else {
      return res.status(httpStatus.OK).json([]);
    }
    
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: e.message
    });
  }
}

module.exports = controller