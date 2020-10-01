const Conversation = require("../models/conversationModel");
const encryption = require('../utils/encryption');

exports.insertConversation = async (req, res, next) => {
    try {
        const newMessage = await Conversation.create(req.body);
        newMessage.message = encryption.decrypt(newMessage.message);
        res.status(201).json({
            status: "success",
            message: newMessage
        });

    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        });
    }
}

exports.getConversation = async (req, res) => {
    try {
        if(req.body.user1_id && req.body.user2_id){
            const user1_id = req.body.user1_id;
            const user2_id = req.body.user2_id;

            const conversations = await Conversation.find({$or:[{sender: user1_id,recipient: user2_id},{sender: user2_id,recipient: user1_id}]});
            res.status(201).json({
                status: "success",
                conversations
            });
            // {sender: "5f72bf2913b8bec0ff5f097a"}
        } else {
            res.status(400).json({
                status: "Bad request",
                message: "One or more parameter missing"
            });
        }
        const {user1_id,user2_id} = req.body
    } catch (error) {
        res.status(400).json({
            status: "failure",
            message: error.message
        });
    }
}