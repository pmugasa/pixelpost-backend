const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/orderControllers");

//get all orders
router.get("/", orderControllers.order_index);

//get order details
router.get("/:id", orderControllers.order_details);

//place an order
router.post("/", orderControllers.order_create);
//update an order
router.put("/:id", orderControllers.order_update);
//delete an order
router.delete("/:id", orderControllers.order_delete);

module.exports = router;
