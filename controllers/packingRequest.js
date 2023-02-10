const PackingRequest = require("../models/packingRequest");

//all packing requests
const pack_index = async (req, res) => {
  const packRequests = await PackingRequest.find({}).populate("user", {
    email: 1,
  });
  try {
    res.status(200).json(packRequests);
  } catch (error) {
    res.status(500).json(error);
  }
};

const pack_create = async (req, res) => {
  const body = req.body;

  try {
    const packRequest = new PackingRequest({
      user: body.user._id,
      parcels: body.parcels,
      addons: body.addons,
    });
    await packRequest.save();
    res.status(201).json(parcel);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  pack_index,
  pack_create,
};
