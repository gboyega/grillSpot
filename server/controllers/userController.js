const bcrypt = require("bcrypt");
let User = require("../models/user.model");

module.exports.create = async (req, res) => {
  user = await User.findOne({ email: req.body.email });
  if (user != null) {
    res.status(403).json({message:'User already exists with this account details. Login to continue'});
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      };

      const newUser = new User(user);

      newUser
        .save()
        .then(() =>
          res
            .status(201)
            .json({
              message: "User created.",
              body: { name: user.name, id: user._id }
            })
        )
        .catch(err =>
          res.status(400).json({ error: err, Message: "User Not created" })
        );
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
};

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user == null || undefined) {
    return res.status(401).json({message:"user not found"});
  } else {
    try {
      const check = await bcrypt.compare(req.body.password, user.password);
      console.log(check);
      if (check) {
        res.status(200).json({ body:{name: user.name, id: user._id} });
      } else {
        res.status(401).json({message:"incorrect password"});
      }
    } catch (err) {
      console.log(err);
      res.status(500).send();
    }
  }
};
