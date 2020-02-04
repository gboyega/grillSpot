let Review = require("../models/review.model");

module.exports.create = (req, res) => {
  const review = req.body;

  newReview = new Review(review);

  newReview
    .save()
    .then(() =>
      res.status(200).send({ message: "Thank you for leaving a review" })
    )
    .catch(err =>
      res.status(400).send({ error: err, message: "Failed, please try again" })
    );
};

module.exports.getMany = async (req, res) => {
  const reviews = await Review.find({ spotId: req.params.spotId });
  try {
    if (reviews.length == 0) {
      () =>
        res
          .status(204)
          .json({ message: "No review available for this spot yet" });
    } else {
      (() => res.status(200).send(reviews));
    }
  } catch (err) {
      console.log(err);
      (() => res.status(500).send());
  }
};
