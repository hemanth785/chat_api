const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const app = express();
const userRouter = require('./routes/userRoutes');
const conversationRouter = require('./routes/conversationRoutes');
// const cors = require('cors')

dotenv.config({path: "config.env"});

// app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});
 
// app.use(express.static(environmentRoot + '/public'));

app.get("/",(req,res) => {
    res.status(200).json("welcome to chat app...!!!");
});

app.use('/api/users', userRouter);
app.use('/api/conversation', conversationRouter);

//mongo db connection

const DB = process.env.DATABASE ;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database connection successful");
})

module.exports = app;