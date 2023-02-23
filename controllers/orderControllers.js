const Order = require("../models/order");
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

//get all orders
const order_index = async (req, res, next) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }
  try {
    const orders = await Order.find({}).populate("user", { email: 1 });
    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(404).json("Orders not found");
    }
  } catch (error) {
    next(error);
  }
};

//get order details
const order_details = async (req, res, next) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    next(error);
  }
};

//create order
const order_create = async (req, res, next) => {
  const body = req.body;

  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.JWT_SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const order = new Order({
    user: user._id,
    customsInformation: body.customsInformation,
    selectedAddons: body.selectedAddons,
    //selectedCarrier: body.selectedCarrier,
  });

  try {
    const savedOrder = await order.save();
    user.orders = user.orders.concat(savedOrder._id);
    await user.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

//update an order
const order_update = async (req, res, next) => {
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }
  const id = req.params.id;
  const updateInfo = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updateInfo, {
      new: true,
    });

    res.status(201).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

//delete an order
const order_delete = async (req, res, next) => {
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).json("Successfully deleted parcel");
    }
  } catch (error) {
    next(error);
  }
};
module.exports = {
  order_index,
  order_create,
  order_update,
  order_delete,
  order_details,
};
