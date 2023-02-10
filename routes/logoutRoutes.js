const express = require("express");
const router = express.Router();
const logoutControllers = require("../controllers/logoutControllers");

router.post("/", logoutControllers.logout_user);

module.exports = router;
