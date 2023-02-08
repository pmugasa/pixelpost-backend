const mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const Carrier = mongoose.model("Carrier", carrierSchema);

module.exports = Carrier;
