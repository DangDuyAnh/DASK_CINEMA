const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");
const httpStatus = require("../utils/httpStatus");
const bcrypt = require("bcrypt");
const {JWT_SECRET} = require("../constants/constants");
const usersController = {};

usersController.register = async (req, res, next) => {
    try {
        const {
            email,
            password,
            firstname,
            lastname,
            phonenumber,
            gender,
            birthday,
            address
        } = req.body;

        let user = await UserModel.findOne({
            email: email
        })

        let avatar = "/uploads/images/default_avatar.jpg"

        if (user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "Email already exists"
            });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new UserModel({
            email: email,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            phonenumber: phonenumber,
            gender: gender,
            avatar: avatar,
        });

        try {
            const savedUser = await user.save();

            // login for User
            // create and assign a token
            const token = jwt.sign(
                {firstname: savedUser.firstname, lastname: savedUser.lastname, email: savedUser.email, id: savedUser._id},
                JWT_SECRET
            );
            res.status(httpStatus.CREATED).json({
                user: user,
                token: token
            })
        } catch (e) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: e.message
            });
        }
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
    }
}

usersController.login = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await UserModel.findOne({
            email: email
        })

        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Email or password incorrect'
            });
        }

        // password 
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Email or password incorrect'
            });
        }

        // login success

        // create and assign a token
        const token = jwt.sign(
            {firstname: user.firstname, lastname: user.lastname, email: user.email, id: user._id},
            JWT_SECRET
        );
        delete user["password"];
        return res.status(httpStatus.OK).json({
            user: user,
            token: token
        })
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        })
    }
}

usersController.changedPassword = async (req, res, next) => {
    try {
        let userId = req.userId;
        let user = await UserModel.findById(userId);
        if (user == null) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "UNAUTHORIZED"
            });
        }
        const {
            currentPassword,
            newPassword,
        } = req.body;
        // password
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Current password incorrect',
                code: 'CURRENT_PASSWORD_INCORRECT'
            });
        }

        // Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassWord = await bcrypt.hash(newPassword, salt);

        user = await UserModel.findOneAndUpdate({_id: userId}, {
            password: hashedNewPassWord
        }, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'Can not find user'
            });
        }

        // create and assign a token
        const token = jwt.sign(
            {firstname: user.firstname, lastname: user.lastname, email: user.email, id: user._id},
            JWT_SECRET
        );
        user = await UserModel.findById(userId).select('email firstname lastname phonenumber gender birthday address avatar').populate('avatar');
        return res.status(httpStatus.OK).json({
            data: user,
            token: token
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        })
    }
}

usersController.show = async (req, res, next) => {
    try {
        let userId = null;
        if (req.params.id) {
            userId = req.params.Id;
        } else {
            userId = req.userId;
        }

        let user = await UserModel.findById(userId).select('email firstname lastname phonenumber gender birthday address avatar').populate('avatar');
        if (user == null) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: 'Can not find user'
            });    
        }

        return res.status(httpStatus.OK).json({
            data: user
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        })
    }
}

module.exports = usersController;