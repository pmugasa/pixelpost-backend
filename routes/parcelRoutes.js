const express = require("express");
const router = express.Router();
const parcelControllers = require("../controllers/parcelController");

//create a parcel
router.post("/", parcelControllers.parcel_create);

module.exports = router;
