const mongoose = require("mongoose");

const packingRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parcels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReceivedParcel",
    },
  ],
  addons: [
    {
      type: String,
      required: false,
    },
  ],
});

const PackingRequest = mongoose.model("PackingRequest", packingRequestSchema);

module.exports = PackingRequest;
