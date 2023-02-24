const Parcel = require("../models/parcel");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

//isolate token from authorization header
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

//create parcel
const parcel_create = async (req, res, next) => {
  const body = req.body; // the body will include parcel dimensions and weight and locker number
  const lockerNumber = body.lockerNumber;
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //check if users is an admin
  if (!decoded || decoded.email !== "pmugasa78@gmail.com") {
    return res.status(401).send({ error: "Not authorized" });
  }

  //finding the user  with the associated associated locker number
  const user = await User.findOne({ lockerNumber });
  if (!user) {
    res
      .status(404)
      .json(`No user found with locker number ${body.lockerNumber}`);
  }

  //create the parcel
  const parcel = new Parcel({
    parcelLength: body.parcelLength,
    height: body.height,
    width: body.width,
    weight: body.weight,
  });
  try {
    //adding parcel to the packing request

    const savedParcel = await parcel.save();
    user.parcels.push(savedParcel._id);
    await user.save();

    res.status(201).json(savedParcel);
  } catch (error) {
    next(error);
  }
};

//get all parcel of a particular user
const parcel_get = async (req, res, next) => {
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }
  const parcels = await Parcel.find({ user: req.params.userId });
  console.log("PARCELS");
  if (parcels) {
    try {
      res.status(200).json(parcels);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).send({ error: "Parcel not found" });
  }
};

//get all created parcels
const parcel_index = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //check if users is an admin
  if (!decoded || decoded.email !== "pmugasa78@gmail.com") {
    return res.status(401).send({ error: "Not authorized" });
  }

  try {
    const parcels = await Parcel.find({}).populate("user");
    if (parcels) {
      return res.status(200).json(parcels);
    } else {
      return res.status(404).send({ error: "No parcels found" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const parcel_single = async (req, res) => {
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }

  const id = req.params.id;
  try {
    const parcel = await Parcel.findById(id);
    if (parcel) {
      return res.status(200).json(parcel);
    } else {
      return res.status(404).send({ error: "Parcel not found" });
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};
module.exports = {
  parcel_create,
  parcel_get,
  parcel_single,
  parcel_index,
};
