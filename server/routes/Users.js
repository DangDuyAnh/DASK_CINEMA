const usersController = require("../controllers/Users");
const {asyncWrapper} = require("../utils/asyncWrapper");
const express = require("express");
const usersRoutes = express.Router();
const auth = require("../middlewares/auth");
const uploadFiles = require("../middlewares/uploadFiles");

usersRoutes.post(
    "/register",
    asyncWrapper(usersController.register)
);

usersRoutes.post(
    "/login",
    asyncWrapper(usersController.login)
);

usersRoutes.post(
    "/edit",
    auth,
    asyncWrapper(usersController.edit),
);

usersRoutes.post(
    "/change-password",
    auth,
    asyncWrapper(usersController.changedPassword),
);

usersRoutes.post(
    "/changeAvatar",
    auth,
    uploadFiles,
    asyncWrapper(usersController.changeAvatar)
);

usersRoutes.get(
    "/show",
    auth,
    asyncWrapper(usersController.show),
);

usersRoutes.get(
    "/show/:id",
    auth,
    asyncWrapper(usersController.show),
);

module.exports = usersRoutes;