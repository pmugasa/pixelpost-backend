const mongoose = require("mongoose");
const addonsSchema = require("./addons");
const packingRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parcels: [
    {
      trackingNumber: {
        type: String,
        required: true,
      },
    },
  ],
  addons: [addonsSchema],
});

const PackingRequest = mongoose.model("PackingRequest", packingRequestSchema);

module.exports = PackingRequest;
