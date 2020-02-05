var multer = require('multer');
var upload = multer({ dest: "temp/", limits: { fieldSize: 8 * 1024 * 1024 } });
const spotResource = require('../controllers/spotController');

const reviewResource = require('../controllers/reviewController');

const userResource = require('../controllers/userController');

const menuResource = require('../controllers/menuController');

module.exports = (app) => {
    app.route('/api/spots/')
    .post(spotResource.create)
    .get(spotResource.getAll);

    app.route("/api/upload/").post(upload.single("file"), spotResource.upload);

    app.route('/api/spots/:spotId')
    .get(spotResource.getOne)
    .put(spotResource.update)
    .delete(spotResource.delete);

    app.route('/api/reviews/')
    .post(reviewResource.create);

    app.route('/api/reviews/:spotId')
    .get(reviewResource.getMany);

    app.route('/api/users/')
    .post(userResource.create);

    app.route('/api/users/login')
    .post(userResource.login);

    app.route('/api/menu/')
    .post(menuResource.create);

    app.route('/api/menu/:spotId')
    .get(menuResource.getOne)
    .put(menuResource.update);


};