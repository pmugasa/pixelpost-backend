const PackingRequest = require("../models/packingRequest");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//isolate token from authorization header
const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

//all packing requests
const pack_index = async (req, res, next) => {
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }

  const packRequests = await PackingRequest.find({}).populate("user", {
    email: 1,
  });
  try {
    res.status(200).json(packRequests);
  } catch (error) {
    next(error);
  }
};

//creating a packing request form
const pack_create = async (req, res, next) => {
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }
  const body = req.body;
  console.log("REQ BODY:", body);
  const user = await User.findById(decodedToken.id);
  try {
    const packRequest = new PackingRequest({
      user: user.lockerNumber,
      parcels: body.parcels,
      addons: body.addons,
    });
    console.log("PACKING REQUEST", packRequest);

    const newPackRequest = await packRequest.save();
    //adding the new packing request onto user profile
    user.packingRequests.push(newPackRequest._id);
    await user.save();

    console.log("USER:", user);
    res.status(201).json(newPackRequest);
  } catch (error) {
    next(error);
  }
};

//getting a single packing request by its id
const pack_single = async (req, res) => {
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid, please login" });
  }

  const id = req.params.id;

  try {
    const packingRequest = await PackingRequest.findById(id);
    if (packingRequest) {
      return res.status(200).json(packingRequest);
    } else {
      return res.status(404).send({ error: "Not found" });
    }
  } catch (error) {
    return res.status(400).send({ error: "Invalid id, please check your id" });
  }
};

module.exports = {
  pack_index,
  pack_create,
  pack_single,
};
