const bookController = require('../controllers/Book');
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const bookRoutes = express.Router();
const auth = require("../middlewares/auth");

bookRoutes.post(
    "/create",
    auth,
    asyncWrapper(bookController.create)
)

bookRoutes.post(
    "/list",
    asyncWrapper(bookController.list)
)

bookRoutes.get(
    "/find",
    auth,
    asyncWrapper(bookController.find)
)

module.exports = bookRoutes