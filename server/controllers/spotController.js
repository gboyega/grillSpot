let Spot = require('../models/spot.model');

const imageUpload = (img) => {
    
}

module.exports.create = ( req, res ) => {
    const spot = req.body;

    const newSpot = new Spot(spot);

    newSpot.save()
    .then(() => res.status(201).json({message: 'Spot created successfully!'}))
    .catch(err => res.status(400).json({error: err, Message: 'Spot Not created'}));
};

module.exports.update = () => {};

module.exports.getAll = (req, res) => {

};

module.exports.getOne = () => {};