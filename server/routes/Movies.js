const moviesController = require("../controllers/Movies");
const {asyncWrapper} = require("../utils/asyncWrapper");
const uploadFiles = require("../middlewares/uploadFiles");
const express = require("express");
const moviesRoutes = express.Router();

moviesRoutes.post(
    "/create",
    uploadFiles,
    asyncWrapper(moviesController.create)
)

moviesRoutes.get(
    "/getListMovies/:movieKind",
    asyncWrapper(moviesController.getMovieList)
)

moviesRoutes.get(
    "/getMovie/:id",
    asyncWrapper(moviesController.getMovie)
)
module.exports = moviesRoutes