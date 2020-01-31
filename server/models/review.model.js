const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  spotId: {
    type: String,
    trim: true,
    required
  },

  review: {
    name: {
      type: String,
      trim: true,
      required
    },

    title: {
      type: String,
      trim: true,
      required
    },

    review: {
      type: String,
      trim: true,
      required
    }
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
