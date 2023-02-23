const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const user_login = async (req, res) => {
  const { email, password } = req.body;

  //search for the user with given email
  const user = await User.findOne({ email });

  //check if password is correct
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  //create token if password is correct
  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({
    token,
    email: user.email,
  });
};

module.exports = {
  user_login,
};
