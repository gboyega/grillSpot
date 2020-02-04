const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim:true,
        required:true
    },

    email: {
        type: String,
        trim:true,
        required:true,
        unique: true
    },

    password: {
        type: String,
        required:true,
        trim:true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;