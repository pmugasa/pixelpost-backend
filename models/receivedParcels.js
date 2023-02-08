const mongoose = require("mongoose");

//received parcel schema

const receivedParcelSchema = new mongoose.Schema(
  {
    shipmentId: {
      type: mongoose.Types.ObjectId,
      default: mongoose.Types.ObjectId,
      alias: "_id",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    trackingNumber: String,
    weight: Number,
  },

  { timestamps: true }
);

//received parcel model
const ReceivedParcel = mongoose.model("ReceivedParcel", receivedParcelSchema);

module.exports = ReceivedParcel;
