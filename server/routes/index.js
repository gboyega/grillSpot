const spotResource = require('../controllers/spotController');

const reviewResource = require('../controllers/reviewController');

const userResource = require('../controllers/userController');

module.exports = (app) => {
    app.route('/api/spots/')
    .post(spotResource.create)
    .get(spotResource.getAll)
    .put(spotResource.update);

    app.route('/api/spots/:spotId')
    .get(spotResource.getOne);

    app.route('/api/reviews/')
    .post(reviewResource.create);

    app.route('/api/reviews/:spotId')
    .get(reviewResource.getOne);

    app.route('/api/users/')
    .post(userResource.create);

    app.route('/api/users/login')
    .post(userResource.login);


};