const Order = require("../models/order");
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
const order_index = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", { email: 1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json("No orders found");
  }
};

//get order details
const order_details = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findById(id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).end();
  }
};

//create order
const order_create = async (req, res) => {
  const body = req.body;
  //verify token
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token invalid" });
  }
  const user = await User.findById(body.userId);
  const order = new Order({
    user: user._id,
    customsInformation: body.customsInformation,
    selectedAddons: body.selectedAddons,
    selectedCarrier: body.selectedCarrier,
  });

  try {
    const savedOrder = await order.save();
    user.orders = user.orders.concat(savedOrder._id);
    await user.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update an order
const order_update = async (req, res) => {
  const id = req.params.id;
  const updateInfo = req.body;
  try {
    const result = await Order.findByIdAndUpdate(id, updateInfo, { new: true });
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete an order
const order_delete = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      res.status(404).send();
    } else {
      res.status(200).json("Successfully deleted parcel");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  order_index,
  order_create,
  order_update,
  order_delete,
  order_details,
};
