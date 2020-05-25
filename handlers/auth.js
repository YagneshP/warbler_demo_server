const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
    try {
        //finding user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;

        // checking if thier password matches
        let isMatch = await user.comparePassword(req.body.password);
        if (isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email/Password."
        });
    }

    //if all matches log them in
};




exports.signup = async function (req, res, next) {
    try {

        let user = await db.User.create(req.body);

        let { id, username, profileImageUrl } = user;

        let token = jwt.sign({
            id,
            username,
            profileImageUrl
        }, process.env.SECRET_KEY);

        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token
        });

    } catch (err) {
        //if a validation fails!
        if (err.code === 11000) {
            err.message = "Sorry , that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
        //see what kind of error
        //if it is a certain error
        //respond with username/email already taken
        //otherwise just send back a generic 400
    }
};

