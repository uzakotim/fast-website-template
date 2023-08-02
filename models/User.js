var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Let us know you by adding your name!"],
    },
    email: {
        type: String,
        required: [true, "Please add your email as well."],
    },
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
