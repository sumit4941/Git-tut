//importing the dependencies/modules

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

//Use express
var app = express();

//required router from route file
const route = require('./routes/route');

//adding body-bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//adding static files
app.use(express.static(path.join(__dirname, "public")));

//adding middleware
app.use(cors());

//addinf routes
app.use('/api', route);

//connect to Mongodb
mongoose.connect("mongodb://localhost:27017/contactlist", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//on connection with Mongo
mongoose.connection.on("connected", () => {
    console.log("Connection Successfull to MongoDB @ 27017");
});
mongoose.connection.on("error", (err) => {
    if (err) {
        console.log("connection error to MongoDB @ 27017");
    }
});



//port number
const port = 8080;

//testing Server
app.get("/", (req, res) => {
    res.send("<h1>Testing Server.........................</h1>");
});


app.listen(port, () => {
    console.log("Server Started at port : " + port);
});