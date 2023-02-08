const mongoose = require("mongoose");

const customsSchema = new mongoose.Schema({
  description: String,
  valueAmount: Number,
  quantity: Number,
  netWeight: Number,
});

const Customs = mongoose.model("Customs", customsSchema);

module.exports = Customs;
