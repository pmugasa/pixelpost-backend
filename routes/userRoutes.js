const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

//get all users
router.get("/", userControllers.user_index);

//create an account
router.post("/create-account", userControllers.user_create);

//user parcel
router.get("/:id", userControllers.user_locker);

module.exports = router;
