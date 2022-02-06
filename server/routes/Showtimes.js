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

showtimeRoutes.get(
    "/findShowtime/:id",
    asyncWrapper(showtimeController.get)
)

showtimeRoutes.get(
    "/getList",
    asyncWrapper(showtimeController.getList)
)

module.exports = showtimeRoutes