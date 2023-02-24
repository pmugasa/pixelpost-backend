const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//isolate token from authorization header
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

//all users, to only be accessed by the admin
const user_index = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //check if users is an admin
  if (!decoded || decoded.email !== "pmugasa78@gmail.com") {
    return res.status(401).send({ error: "Not authorized" });
  }

  const users = await User.find({});

  res.json(users);
};

// get a specific user and their parcels, orders, packing requests
const user_locker = async (req, res) => {
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid, please login" });
  }
  const id = req.params.id;

  try {
    const userLocker = await User.findById(id).populate([
      "parcels",
      "orders",
      "packingRequests",
      "receivedParcels",
    ]);
    if (userLocker) {
      return res.status(200).json(userLocker);
    } else {
      return res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).send({ error: "Invalid user id" });
  }
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
  user_locker,
};
