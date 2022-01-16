const controller = require("../controllers/Snacks");
const {asyncWrapper} = require("../utils/asyncWrapper");
const uploadFiles = require("../middlewares/uploadFiles");
const express = require("express");
const routes = express.Router();

routes.get(
    "/list",
    controller.list
)

module.exports = routes