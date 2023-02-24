const express = require("express");
const router = express();
const shipmentController = require("../controllers/shipmentController");

//get shipping rates

//create shipment
router.post("/", shipmentController.create_shipment);

//purchase shipment label

module.exports = router;
