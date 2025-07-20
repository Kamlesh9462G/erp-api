const express = require("express");

const {authController} = require("../controllers/index")
const router = express.Router();

router.post("/login", authController.loginCompanyUser);

module.exports = router;
