const pageviewController = require("../controllers/Pageview");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const pageviewRoutes = express.Router();
const admin = require("../middlewares/admin")

pageviewRoutes.post(
    "/plusCount",
    asyncWrapper(pageviewController.plusCount)
)

pageviewRoutes.post(
    "/get/",
    admin,
    asyncWrapper(pageviewController.get)
)

module.exports = pageviewRoutes