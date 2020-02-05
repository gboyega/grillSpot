let Menu = require("../models/menu.model");

module.exports.create = (req, res) => {
    const menu = req.body;
    
    newMenu = new Menu(menu);

    newMenu.save()
    .then(() => res.status(200).send({Message: 'Menu item created successfully'}))
    .catch(err => res.status(400).send({error:err, message: 'Menu item not created. Please try again.'}));
};

module.exports.getMany = async (req, res) => {
  const menu = await Menu.find({ spotId: req.params.spotId });
  try {
    if (reviews.length == 0) {
      () =>
        res
          .status(204)
          .json({ message: "No menu available for this spot" });
    } else {
      () => res.status(200).send(menu);
    }
  } catch (err) {
    console.log(err);
    () => res.status(500).send();
  }
};


module.exports.update = (req, res) => {
  const menu = req.body;

  Todo.findByIdAndUpdate({ _id: req.params.menuId }, menu, { new: true })
    .then(menu =>
      res.json({ body: menu, message: "Todo updated successfully" })
    )
    .catch(err =>
      res.status(400).json({ error: err, message: "cannot update Menu" })
    );
};

module.exports.delete = (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.menuId })
    .then(() => res.json({ message: "Menu item has been deleted" }))
    .catch(err =>
      res.status(400).json({ error: err, message: "cannot delete Menu item" })
    );
};
