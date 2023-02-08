const mongoose = require("mongoose");

const addonsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const Addons = mongoose.model("Addons", addonsSchema);

module.exports = Addons;
