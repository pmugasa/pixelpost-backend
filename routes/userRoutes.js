const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

//get all users
router.get("/users", userControllers.user_index);

//create an account
router.post("/create-account", userControllers.user_create);

module.exports = router;
