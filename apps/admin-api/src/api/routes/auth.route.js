const express = require("express");
const {authController} = require("../controllers/index")
const router = express.Router();

router.post("/signup", authController.signupAdmin);
router.post("/signin", authController.loginAdmin);

module.exports = router;
