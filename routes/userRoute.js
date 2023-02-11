const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/api/register", userController.register); //register
router.post("/api/login", userController.login); //login
router.get("/api/logout", userController.logout); //logout
router.post("/api/forget", userController.forgetPassword); //forgot password

module.exports = router;
