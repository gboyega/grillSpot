let Review = require("../models/review.model");

module.exports.create = (req, res) => {
  const review = req.body;
  console.log({review});
  newReview = new Review(review);

  newReview
    .save()
    .then(() =>
      res.status(200).send({ message: "Thank you for leaving a review" })
    )
    .catch(err =>{
      console.log(err);
      res.status(400).send({ error: err, message: "Failed, please try again" });
    });
};

module.exports.getMany = (req, res) => {
  Review.find({ spotId: req.params.spotId })
    .then(reviews => res.status(200).json({ body: reviews }))
    .catch(err =>
      res
        .status(500)
        .json({ error: err, message: "no reviews found for this spot" })
    );
};
