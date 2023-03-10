const express = require("express");
const router = express.Router();
const packingRequestControllers = require("../controllers/packingRequest");

//get all packing requests
router.get("/", packingRequestControllers.pack_index);

//create a packing request
router.post("/new", packingRequestControllers.pack_create);

//single packing request
router.get("/:id", packingRequestControllers.pack_single);

module.exports = router;
