var express = require("express");
var router = express.Router();

var controllers = require('../controllers/recipeAction');
var upload = require('./../helpers/utils').upload;

var MAIN_ROUTE = "/recipes";

router.get(MAIN_ROUTE, controllers.getAllRecipes);
router.get(MAIN_ROUTE + "/:type", controllers.getTypeRecipes);
router.get('/recipe' + "/:id", controllers.getRecipe);
router.post(MAIN_ROUTE, upload.single("img"), controllers.saveRecipe);
router.put(MAIN_ROUTE + "/:id", upload.single('img'), controllers.updateRecipe);
router.delete(MAIN_ROUTE + "/:id", controllers.deleteRecipe);

module.exports = router;