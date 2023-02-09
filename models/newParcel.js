const mongoose = require("mongoose");

const newParcelSchema = new mongoose.Schema({
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

const NewParcel = mongoose.model("NewParcel", newParcelSchema);

module.exports = NewParcel;
