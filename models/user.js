const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  lockerNumber: String,
  receivedParcels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReceivedParcel",
    },
  ],
  newParcel: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewParcel",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

//user model
const User = mongoose.model("User", userSchema);

module.exports = User;
