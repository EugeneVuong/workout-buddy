const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .post("/login", authController.handleLogin)
  .post("/register", authController.handleNewUser)
  .get("/logout", authController.handleLogout)
  .get("/refreshtoken", authController.handleRefreshToken);

module.exports = router;
