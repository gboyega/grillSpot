const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const menuSchema = new Schema({
  spotId: {
    type: String,
    trim: true,
    required: true
  },
  
  name: {
    type: String,
    trim: true,
    required: true
  },

  price: {
    type: String,
    trim: true,
    required: true
  }
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
