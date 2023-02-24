const express = require("express");
const router = express.Router();
const parcelControllers = require("../controllers/parcelController");

//create a parcel
router.post("/create", parcelControllers.parcel_create);

//get all parcels -> only accessed by admin
router.get("/", parcelControllers.parcel_index);

//get parcel by its id
router.get("/:id", parcelControllers.parcel_single);

module.exports = router;
