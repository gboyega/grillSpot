let Menu = require("../models/menu.model");

module.exports.create = (req, res) => {
    const menu = req.body;
    
    newMenu = new Menu(menu);

    newMenu.save()
    .then(() => res.status(200).send({Message: 'Menu item created successfully'}))
    .catch(err => res.status(400).send({error:err, message: 'Menu item not created. Please try again.'}));
};

module.exports.getOne = (req, res) => {
    
};

module.exports.update = () => {};
