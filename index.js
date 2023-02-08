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
app.post("/api/received-parcels", async (req, res) => {
  const body = req.body;
  if (body === undefined) {
    res.status(400).json({
      error: "Content missing. Please fill in the form",
    });
  }
  const parcel = new ReceivedParcel({
    userId: "PM002",
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
app.put("/api/received-parcels/:id", async (req, res) => {
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
app.delete("/api/received-parcels/:id", async (req, res) => {
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
    parcels: body.parcels,
    addons: body.addons,
    user: user._id,
    address: body.address,
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

app.listen(4000, () => {
  console.log("Server started on Port 4000");
});
