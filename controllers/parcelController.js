const Parcel = require("../models/parcel");
const Order = require("../models/order");
const jwt = require("jsonwebtoken");

//create parcel
const parcel_create = async (req, res, next) => {
  const body = req.body;
  const token = req.header("Authorization").replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //check if users is an admin
  if (!decoded || decoded.email !== "pmugasa78@gmail.com") {
    return res.status(401).send({ error: "Not authorized" });
  }

  //finding the order with the associated ID
  const order = await Order.findById({ _id });
  if (!order) {
    res.status(404).send({ error: "Order not found" });
  }
  //create the parcel
  const parcel = new Parcel({
    length: body.length,
    height: body.height,
    width: body.width,
    weight: body.weight,
  });
  try {
    //adding parcel to the order
    order.parcel.push(parcel._id);
    await order.save();
    const savedParcel = await parcel.save();
    res.status(201).json(savedParcel);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  parcel_create,
};
