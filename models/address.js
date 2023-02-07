const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street1: {
    type: String,
    required: true,
  },
  street2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },

  postalCode: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
