const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true,"please provide driver name"]
    },
    email: {
        type: String,
        required: [true,"please provide driver email"],
        unique: true,
        lowercase: true,
    },
    phone_number: {
        type: Number,
        required: [true, "Please enter phone number"],
        unique: true,
        min: [1000000000,"Please provide valid 10 digit number"],
        max: [9999999999,"Please provide valid 10 digit number"]
    }
});


const User = mongoose.model("User",userSchema);
module.exports = User;