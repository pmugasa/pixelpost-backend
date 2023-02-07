const mongoose = require("mongoose");

const newParcelSchema = new mongoose.Schema(
  {
    weight: Number,
    dimensionalWeight: Number,
    addons: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    status: Boolean,
  },
  { timestamps: true }
);
