const mongoose = require("mongoose");

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
  addons: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

const PackingRequest = mongoose.model("PackingRequest", packingRequestSchema);

module.exports = PackingRequest;
