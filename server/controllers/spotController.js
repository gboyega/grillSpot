require("dotenv").config();
const fs = require("fs");
var cloudinary = require("cloudinary").v2;
let Spot = require('../models/spot.model');
var spotImg;
var spotPlaceHolder = "https://res.cloudinary.com/gboyega/image/upload/v1574848771/grillspot/LogoMakr_7e9Jxn_a6oa1d.png";

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
}); 

module.exports.upload =  (req, res) => {
     if (!req.file) {
       res.status(415).json({ message: "invalid upload request" });
     }
     cloudinary.uploader.upload(
       req.file.path,
       {
         folder: "grill_spot/spots",
         use_filename: true,
         unique_filename: true,
         overwrite: false,
         tags: "grill_spot"
       },
       (err, image) => {
         if (err) {
           console.warn(err);
         }
         spotImg = image.url;
         res.status(200).json({body:spotImg});
       }
     );
};

module.exports.create = ( req, res ) => {
    const spot = {
        name: req.body.name,
        location: req.body.location,
        owner: req.body.owner,
        address: req.body.address,
        phone: req.body.phone,
        mail: req.body.mail,
        website: req.body.website,
        image: spotImg || spotPlaceHolder,
        category: req.body.category,
        ownerId: req.body.ownerId
    };
    
   const newSpot = new Spot(spot);

    newSpot.save()
    .then(() => res.status(201).json({message: 'Spot created successfully!', body: newSpot }))
    .catch(err => {
      res.status(400).json({error: err, message: 'Spot Not created'});
      console.log(err);
    });
};

module.exports.getAll = (req, res) => {
  Spot.find()
    .then(spots => res.status(200).json({body:spots}))
    .catch(err =>
      res.status(400).json({ error: err, message: "Spots cannot be fetched." })
    );
};

module.exports.getOne = (req, res) => {
  Spot.findById(req.params.spotId)
    .then(spot => res.json({ body: spot }))
    .catch(err =>
      res.status(400).json({ error: err, message: "Cannot fetch Spot " })
    );
};

module.exports.update = (req, res) => {
  const spot = req.body;

  Spot.findByIdAndUpdate({ _id: req.params.spotId }, spot, { new: true })
    .then(spot =>
      res.json({ body: spot, message: "Spot updated successfully" })
    )
    .catch(err =>
      res.status(400).json({ error: err, message: "cannot update Spot" })
    );
};

module.exports.delete = (req, res) => {
  Spot.findOneAndDelete({ _id: req.params.spotId })
    .then(() => res.json({message: "spot has been deleted" }))
    .catch(err =>
      res.status(400).json({ error: err, message: "cannot delete spot" })
    );
};
