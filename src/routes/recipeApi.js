const express = require("express");
const router = express.Router();

const controllers = require('../controllers/recipeAction');
const MAIN_ROUTE = "/recipes";

router.get(MAIN_ROUTE, controllers.getAllRecipes);
router.get(MAIN_ROUTE + "/:type", controllers.getTypeRecipes);
router.get('/recipe' + "/:id", controllers.getRecipe);
router.post(MAIN_ROUTE, controllers.saveRecipe);
router.put(MAIN_ROUTE + "/:id", controllers.updateRecipe);
router.delete(MAIN_ROUTE + "/:id", controllers.deleteRecipe);


module.exports = router;