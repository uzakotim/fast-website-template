var User = require("../models/User.js");

module.exports.controller = (app) => {
    // get all users
    app.get("/users", (req, res) => {
        User.find({}, "name email")
            .then((users) => {
                res.send(users);
            })
            .catch((error) => {
                console.log(error);
            });
    });
    // get a single user details
    app.get("/users/:id", (req, res) => {
        User.findById(req.params.id, "name email")
            .then((user) => {
                res.send(user);
            })
            .catch((err) => {
                console.log(err);
            });
    });
    // add a new user
    app.post("/users", (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
        });

        user.save()
            .then((user) => {
                res.send(user);
            })
            .catch((err) => {
                console.log(err);
            });
    });
    // update a user
    app.put("/users/:id", (req, res) => {
        User.findById(req.params.id, "name email")
            .then((user) => {
                user.name = req.body.name;
                user.email = req.body.email;
                user.save()
                    .then((user) => {
                        res.send(user);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    });
    // delete a user
    app.delete("/users/:id", (req, res) => {
        User.deleteOne({
            _id: req.params.id,
        })
            .then((user) => {
                res.send({ success: true });
            })
            .catch((err) => {
                console.log(err);
            });
    });
};
