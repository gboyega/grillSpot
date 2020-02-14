const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spotSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required:true
  },

  location: {
    type: String,
    trim: true,
    required:true
  },

  address: {
    type: String,
    trim: true,
    required:true
  },

  phone: {
    type: String,
    trim: true,
    required:true
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
    required:true
  },

  category: {
    type: String,
    trim: true,
    required:true
  },

  owner: {
    type: String,
    trim: true,
    required: true
  },

  ownerId: {
    type: String,
    trim: true,
    required:true
  },
  
});

const Spot = mongoose.model("Spot", spotSchema);

module.exports = Spot;
