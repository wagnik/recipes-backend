const express = require("express");
const router = express.Router();

const controllers = require('../controllers/userAction');

router.get("/users", controllers.getAllUsers)
router.get("/isAuth", controllers.isAuth);
router.post("/login", controllers.loginUser);
router.post("/register", controllers.registerUser);
router.delete("/logout", controllers.logoutUser);

module.exports = router;