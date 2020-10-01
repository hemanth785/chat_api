const express = require('express');
const user = require('../controllers/userController')

const Router = express.Router();

Router.route("/")
      .get(user.getAllUsers)
      .post(user.insertUser)

module.exports = Router;