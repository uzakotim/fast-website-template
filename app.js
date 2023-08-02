var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const User = require("./models/User.js");
var app = express();

// Connecting and writing to DB
mongoose
    .connect("mongodb://localhost/template_app", {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log("Connection Succeeded");
});

// Create a new entry in the Mongo DB
// -------------------------------------------------------------------
// const newUser = new User({ name: "John", email: "john@doe.com" });
// newUser
//     .save()
//     .then(() => {
//         console.log("Data inserted");
//         User.find()
//             .then((users) => {
//                 console.log(users);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     })
//     .catch((err) => console.error(err));
// -------------------------------------------------------------------

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Require file system module
var fs = require("fs");
// Include controllers
fs.readdirSync("controllers").forEach(function (file) {
    if (file.substr(-3) == ".js") {
        const route = require("./controllers/" + file);
        route.controller(app);
    }
});

app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;
app.listen(3000, () => {
    console.log("Server running at http://127.0.0.1:3000/");
});
