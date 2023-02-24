const mongoose = require("mongoose");

const shipmentSchema = mongoose.Schema({
  address_from: {
    type: String,
    required: true,
  },
  address_to: {
    type: String,
    required: true,
  },
  parcel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parcel",
  },
  customs_declaration: {
    type: String,
    required: true,
  },
  async: {
    type: Boolean,
    required: true,
  },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;
