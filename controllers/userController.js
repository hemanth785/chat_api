const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        //SENDING RESPONSE
        res.status(201).json({
            status: "success",
            results: users.length,
            users: users
        });
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        });
    }
}

exports.insertUser = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        
        res.status(201).json({
            status: "success",
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        });
    }
}