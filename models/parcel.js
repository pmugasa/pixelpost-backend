const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema({
  length: {
    type: Number,
    required: false,
    min: [0, "Parcel length must be a positive number."],
  },
  width: {
    type: Number,
    required: false,
    min: [0, "Parcel width must be a positive number."],
  },
  height: {
    type: Number,
    required: false,
    min: [0, "Parcel height must be a positive number."],
  },
  weight: {
    type: Number,
    required: false,
    min: [0, "Parcel weight must be a positive number."],
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
});

const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;
