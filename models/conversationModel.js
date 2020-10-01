const mongoose = require('mongoose');
const encryption = require('../utils/encryption');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required : [true, "sender must reference a User"]
    },
    recipient: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required : [true, "recipient must reference a User"]
    },
    message: {
        type: String,
        required: [true, "Please provide the message text"]
    }
});

conversationSchema.pre('save',async function(next){
    this.message = encryption.encrypt(this.message);
    // console.log("testing: "+this.message);
    next();
});

// conversationSchema.post(/^create/, function(doc,next){
//     for(doc_item of doc ){
//         console.log(doc_item);
//         doc_item.message = encryption.decrypt(doc_item.message);
//     }
//     next();
// })

conversationSchema.post(/^find/, function(doc,next){
    for(doc_item of doc ){
        // console.log(doc_item);
        doc_item.message = encryption.decrypt(doc_item.message);
    }
    next();
})

const Conversation = mongoose.model("Conversation",conversationSchema);
module.exports = Conversation;