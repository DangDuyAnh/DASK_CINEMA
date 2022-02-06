const cinemaController = require("../controllers/Cinema");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const cinemaRoutes = express.Router();
cinemaRoutes.get(
    "/getListCinema",
    asyncWrapper(cinemaController.getCinemaList)
)
cinemaRoutes.get(
    "/getCinema/:id",
    asyncWrapper(cinemaController.getCinema)
)
module.exports = cinemaRoutes