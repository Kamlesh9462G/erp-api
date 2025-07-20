const express = require("express");
const { companyController } = require("../controllers/index");
const router = express.Router();

router.post("/", companyController.addCompany);

module.exports = router;
