const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admins");
const httpStatus = require("../utils/httpStatus");

const admin = async (req, res, next) => {
  try {
    let decoded;
    try {
        let authorization = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (e) {
        return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: 'not admin'
        });
    }
    const adminId = decoded.id;
    let admin;
    try {
        admin = await AdminModel.findById(adminId);
        if (admin == null) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "not admin"
            });
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }

    req.adminId = adminId;
    next();
  } catch (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: err.message});
  }
};

module.exports = admin;
