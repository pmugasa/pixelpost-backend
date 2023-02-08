const mongoose = require("mongoose");

const newParcelSchema = new mongoose.Schema(
  {
    //user who requested packing
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    //parcels to be packed
    parcels: [
      {
        shipmentId: String,
        require: true,
      },
    ],

    //addons to be applied to items being packed
    addons: {
      itemPhotos: Boolean,
      deviceTesting: Boolean,
      doubleWalledBox: Boolean,
      bubbleWrap: Boolean,
    },
  },

  //date when the request was done
  { timestamps: true }
);

const NewParcel = mongoose.model("NewParcel", newParcelSchema);

module.exports = NewParcel;
