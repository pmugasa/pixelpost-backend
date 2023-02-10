const config = require("./utils/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
//routes
const userRoutes = require("./routes/userRoutes");
const receivedParcelRoutes = require("./routes/receivedParcelRoutes");
const packingRequestRoutes = require("./routes/packingRequestRoutes");
const orderRoutes = require("./routes/orderRoutes");
const loginRoutes = require("./routes/loginRoutes");
const logoutRoutes = require("./routes/logoutRoutes");

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
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/", userRoutes);
app.use("/received-parcel", receivedParcelRoutes);
app.use("/pack", packingRequestRoutes);
app.use("/order", orderRoutes);

//listening for requests
app.listen(4000, () => {
  console.log("Server started on Port 4000");
});
