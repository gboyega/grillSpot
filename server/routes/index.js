const spotResource = require('../controllers/spotController');

const reviewResource = require('../controllers/reviewController');

const userResource = require('../controllers/userController');

module.exports = (app) => {
    app.route('/api/spots/')
    .post(spotResource.create)
    .get(spotResource.getAll);

    app.route('/api/spots/:spotId')
    .get(spotResource.getOne);

    app.route('/api/reviews/')
    .get(reviewResource.create);

    app.route('/api/reviews/:spotId')
    .get(reviewResource.getOne);

}