const mongoose = require("mongoose");

//received parcel schema

const receivedParcelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lockerNumber: {
      type: String,
    },
    dateReceived: {
      type: Date,
      default: Date.now,
    },
    trackingNumber: String,
    weight: Number,
  },

  { timestamps: true }
);

//received parcel model
const ReceivedParcel = mongoose.model("ReceivedParcel", receivedParcelSchema);

module.exports = ReceivedParcel;
