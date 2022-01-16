const showtimeController = require("../controllers/Showtimes");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const showtimeRoutes = express.Router();

showtimeRoutes.post(
    "/create",
    asyncWrapper(showtimeController.create)
)

showtimeRoutes.get(
    "/getShowtime/:id",
    asyncWrapper(showtimeController.find)
)

module.exports = showtimeRoutes