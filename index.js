require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const ReceivedParcel = require("./models/receivedParcels");
const User = require("./models/user");
const NewParcel = require("./models/newParcel");
//middleware
app.use(express.json());

//connecting to the db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL);

//getting all parcels
app.get("/api/received-parcels", async (req, res) => {
  const parcels = await ReceivedParcel.find({});
  if (parcels.length === 0) {
    res.json("You have no received parcels");
  }

  try {
    res.json(parcels);
    mongoose.connection.close();
  } catch (error) {
    res.status(500).json(error);
  }
});

//creating a new received parcel
app.post("/received-parcels", async (req, res) => {
  const body = req.body;
  if (body === undefined) {
    res.status(400).json({
      error: "Content missing. Please fill in the form",
    });
  }
  const parcel = new ReceivedParcel({
    customer: body.user._id,
    trackingNumber: body.trackingNumber,
    weight: body.weight,
  });
  try {
    await parcel.save();
    res.json(parcel);
  } catch (error) {
    res.status(500).send(error);
  }
});

//updating a received parcel
app.put("/received-parcels/:id", async (req, res) => {
  const id = req.params.id;
  const updateInfo = req.body;
  try {
    const result = await ReceivedParcel.findById(id, updateInfo);
    await result.save();
    res.json("Successfully updated");
  } catch (error) {
    res.status(500).send(error);
  }
});

//deleting a received parcel
app.delete("/received-parcels/:id", async (req, res) => {
  try {
    const parcel = await ReceivedParcel.findByIdAndDelete(req.params.id);
    if (!parcel) {
      res.status(404).send();
    } else {
      res.status(200).json("Successfully deleted parcel");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//creating new parcel
app.post("/new-parcel", async (req, res) => {
  const body = req.body;

  const user = await User.findById(body.userId);

  const parcel = new NewParcel({
    user: user._id,
    parcels: body.parcels,
    addons: body.addons,
  });

  const savedParcel = await parcel.save();
  user.newParcel = user.newParcel.concat(savedParcel._id);
  await user.save();

  res.json(savedParcel);
});

//getting all the users

app.get("/users", async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// creating user accounts

app.post("/create-account", async (req, res) => {
  const { email, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

//creating an order
app.post("/new-order", async (req, res) => {
  const body = req.body;

  const order = new Order({
    customer: body.user._id,
    customsInformation: body.customsInformation,
    selectedAddons: body.selectedAddons,
    selectedCarrier: body.selectedCarrier,

    //to be added by the admin
    parcel: {
      length: body.length,
      width: body.width,
      height: body.height,
      weight: body.weight,
    },
  });

  try {
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

//editing an order
app.put("/order/:id", async (req, res) => {
  const id = req.params.id;
  const updateInfo = req.body;
  try {
    const result = await Order.findById(id, updateInfo);
    await result.save();
    res.json("Successfully updated");
  } catch (error) {
    res.status(500).send(error);
  }
});
//deleting an order
app.delete("/order/:id", async (req, res) => {
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
});

//getting all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json("No orders found");
  }
});

app.listen(4000, () => {
  console.log("Server started on Port 4000");
});
