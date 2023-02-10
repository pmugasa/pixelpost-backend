const ReceivedParcel = require("../models/receivedParcels");

const parcel_index = async (req, res) => {
  const parcels = await ReceivedParcel.find({}).populate("user", { email: 1 });
  if (parcels.length === 0) {
    res.json("You have no received parcels");
  }

  try {
    res.json(parcels);
    mongoose.connection.close();
  } catch (error) {
    res.status(500).json(error);
  }
};

//create parcel
const parcel_create = async (req, res) => {
  const body = req.body;
  const lockerNumber = body.lockerNumber;
  if (body === undefined) {
    res.status(400).json({
      error: "Content missing. Please fill in the form",
    });
  }
  try {
    // Find the user associated with the given locker number
    const user = await User.findOne({ lockerNumber });
    if (!user) {
      res
        .status(404)
        .json(`No user found with locker number ${body.lockerNumber}`);
    }

    // Create a new ReceivedParcel object and save it to the database
    const receivedParcel = new ReceivedParcel({
      trackingNumber: body.trackingNumber,
      lockerNumber: body.lockerNumber,
      dateReceived: new Date(),
      user: user._id,
    });
    user.receivedParcels.push(receivedParcel._id);
    await receivedParcel.save();
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//update parcel
const parcel_update = async (req, res) => {
  const id = req.params.id;
  const updateInfo = req.body;
  try {
    const result = await ReceivedParcel.findById(id, updateInfo);
    await result.save();
    res.json("Successfully updated");
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete parcel
const parcel_delete = async (req, res) => {
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
};

module.exports = {
  parcel_index,
  parcel_create,
  parcel_update,
  parcel_delete,
};
