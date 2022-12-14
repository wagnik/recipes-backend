const express = require("express");
const router = express.Router();

const controllers = require('../controllers/userAction');

router.get("/users", controllers.getAllUsers)
router.post("/login", controllers.loginUser);
router.post("/register", controllers.registerUser);

module.exports = router;