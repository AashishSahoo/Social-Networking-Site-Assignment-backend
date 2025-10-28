// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.controller");

router.post("/login", authController.login);
router.post("/register-customer", authController.registerCustomer);

module.exports = router;
