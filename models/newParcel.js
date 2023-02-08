const mongoose = require("mongoose");

const newParcelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  parcels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcel",
    },
  ],
  addons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addons",
    },
  ],
});

const NewParcel = mongoose.model("NewParcel", newParcelSchema);

module.exports = NewParcel;
