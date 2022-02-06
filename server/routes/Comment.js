const commentController = require("../controllers/Comment");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const auth = require("../middlewares/auth");
const commentRoutes = express.Router();

commentRoutes.post(
    "/create",
    auth,
    asyncWrapper(commentController.create)
);

commentRoutes.get(
    "/getList/:id",
    asyncWrapper(commentController.get)  
);

module.exports = commentRoutes