const express = require('express');
const converstation = require('../controllers/conversationController')

const Router = express.Router();

Router.route("/")
      .post(converstation.insertConversation)

Router.route("/getConverstions")
      .post(converstation.getConversation)

module.exports = Router;