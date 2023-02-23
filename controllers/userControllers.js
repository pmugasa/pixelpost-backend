const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//delete_user, update_user

//all users, to only be accessed by the admin
const user_index = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //check if users is an admin
  if (!decoded || decoded.email !== "pmugasa78@gmail.com") {
    return res.status(401).send({ error: "Not authorized" });
  }

  const users = await User.find({}).populate("packingRequests");

  res.json(users);
};

//create an account
const user_create = async (req, res) => {
  const { email, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

module.exports = {
  user_index,
  user_create,
};
