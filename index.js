const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const multer = require("multer");
const {
  unknownEndPoints,
  requestLogger,
  errorHandler,
} = require("./utils/middleware");

//routes
const userRoutes = require("./routes/userRoutes");
const receivedParcelRoutes = require("./routes/receivedParcelRoutes");
const packingRequestRoutes = require("./routes/packingRequestRoutes");
const orderRoutes = require("./routes/orderRoutes");
const loginRoutes = require("./routes/loginRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const parcelRoutes = require("./routes/parcelRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");

//connecting to the db
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGODB_URL)
  .then(() => {
    console.log("CONNECTED TO DB");
  })
  .catch((error) => {
    console.error(error);
  });

//middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/users", userRoutes);
app.use("/received-parcel", receivedParcelRoutes);
app.use("/pack", packingRequestRoutes);
app.use("/order", orderRoutes);
app.use("/parcels", parcelRoutes);
app.use("/create-shipment", shipmentRoutes);
app.use(unknownEndPoints);
app.use(errorHandler);

//listening for requests
app.listen(4000, () => {
  console.log("Server started on Port 4000");
});
