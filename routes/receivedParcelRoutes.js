const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const receivedParcelControllers = require("../controllers/receivedParcelControllers");

//get all parcels
router.get("/", receivedParcelControllers.parcel_index);

//create a received parcel
router.post(
  "/new",
  upload.array("image", 2),
  receivedParcelControllers.parcel_create
);

//update a received parcel
router.put("/:id", receivedParcelControllers.parcel_update);

//delete a received parcel
router.delete("/:id", receivedParcelControllers.parcel_delete);

module.exports = router;
