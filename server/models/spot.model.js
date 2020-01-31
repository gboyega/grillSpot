const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spotSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required
  },

  location: {
    type: String,
    trim: true,
    required
  },

  operator: {
    type: String,
    trim: true
  },

  address: {
    type: String,
    trim: true,
    required
  },

  phone: {
    type: String,
    trim: true,
    required
  },

  mail: {
    type: String,
    trim: true
  },

  website: {
    type: String,
    trim: true
  },

  image: {
    type: String,
    trim: true,
    required
  },

  category: {
    type: String,
    trim: true,
    required
  },

  ownerId: {
    type: String,
    trim: true,
    required
  }
});

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
