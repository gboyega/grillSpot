const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
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

  title: {
    type: String,
    trim: true,
    required: true
  },

  review: {
    type: String,
    trim: true,
    required: true
  },

  date: {
    type: Date,
    required: true
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
