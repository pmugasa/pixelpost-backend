const express = require("express");
const router = express.Router();
const loginControllers = require("../controllers/loginControllers");

//login
router.post("/", loginControllers.user_login);

module.exports = router;
