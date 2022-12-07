const express = require("express");
const router = express.Router();

const controllers = require('../controllers/index');

router.get("/recipes", controllers.getAllRecipes);
router.get("/recipes/:id", controllers.getRecipe);
router.post("/recipes", controllers.saveRecipe);
router.put("/recipes/:id", controllers.updateRecipe);
router.delete("/recipes/:id", controllers.deleteRecipe);


module.exports = router;