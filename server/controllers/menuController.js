let Menu = require("../models/menu.model");

module.exports.create = (req, res) => {
  const menu = req.body;

  newMenu = new Menu(menu);

  newMenu
    .save()
    .then(() =>
      res.status(200).send({ Message: "Menu item created successfully" })
    )
    .catch(err =>
      res
        .status(400)
        .send({
          error: err,
          message: "Menu item not created. Please try again."
        })
    );
};

module.exports.getMany = (req, res) => {
  Menu.find({ spotId: req.params.spotId })
    .then(menu => res.status(200).json({ body: menu }))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err, message: "server error" });
    });
};

module.exports.update = (req, res) => {
  const menu = req.body;

  Menu.findByIdAndUpdate({ _id: req.params.menuId }, menu, { new: true })
    .then(menu =>
      res.json({ body: menu, message: "menu updated successfully" })
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
