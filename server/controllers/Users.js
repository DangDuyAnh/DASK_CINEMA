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
            ten,
            phonenumber,
            gender,
            birthday,
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
            ten: ten,
            phonenumber: phonenumber,
            gender: gender,
            birthday: birthday,
            avatar: avatar,
        });

        try {
            const savedUser = await user.save();

            // login for User
            // create and assign a token
            const token = jwt.sign(
                {ten:savedUser.ten , email: savedUser.email, id: savedUser._id},
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
        let user = await UserModel.findOne({
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
            {ten: user.ten, email: user.email, id: user._id},
            JWT_SECRET
        );
        let returnedUser = await UserModel.findOne({
            email: email
        }).select('-password');
        return res.status(httpStatus.OK).json({
            user: returnedUser,
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

usersController.edit = async (req, res, next) => {
    try {
        let userId = req.userId;

        let  user = await UserModel.findById(userId);
        if (user == null) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "UNAUTHORIZED"
            });
        }

        const {
            currentPassword,
            newPassword,
        } = req.body;

        const validPassword = await bcrypt.compare(currentPassword, user.password);

        if (!validPassword) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Current password incorrect',
                code: 'CURRENT_PASSWORD_INCORRECT'
            });
        }

        if (newPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(newPassword, salt);

            user = await UserModel.findOneAndUpdate({_id: userId}, {
                password: hashedNewPassword
            }, {
                new: true,
                runValidators: true
            });
            }

        const dataUserUpdate = {};
        const listPros = [
            "ten",
            "phonenumber",
            "birthday",
            "gender",
        ];
        for (let i = 0; i < listPros.length; i++) {
            let pro = listPros[i];
            if (req.body[pro]) {
                dataUserUpdate[pro] = req.body[pro];
            }
        }

        user = await UserModel.findOneAndUpdate({_id: userId}, dataUserUpdate, {
            new: true,
            runValidators: true
        });

        user = await UserModel.findById(userId);
        return res.status(httpStatus.OK).json({
            data: user
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        });
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

        let user = await UserModel.findById(userId);
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

usersController.changeAvatar = async (req, res, next) => {
    try {
        let userId = req.userId;
        let user = await UserModel.findById(userId);
        let imageFiles = [];
        if (req.files.images) {
            imageFiles = req.files.images;
        }
        let image;
        imageFiles.forEach((item) => {
            image = '/uploads/images/' + item.filename;
        })

        let savedUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: image
        }, {
            new: true,
            runValidators: true
        });
       
        return res.status(httpStatus.OK).json({
            user: savedUser
        });
    } catch (e) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message
        })
    }
};

module.exports = usersController;