var Recipe = require('../db/models/recipe');

var utils = require('../helpers/utils');
var deleteImageFromPublicFolder = utils.deleteImageFromPublicFolder;
var getImagegPath = utils.getImagegPath;

module.exports = {
  saveRecipe: function (req, res) {
    var body = req.body;
    var imagePath = getImagegPath(req);

    try {
      var newRecipe = new Recipe({
        ...body,
        img: imagePath,
      });

      newRecipe.save(function (err) {
        if (err) {
          return res.status(422).json({ message: err.message });
        }
        res.status(201).json(newRecipe);
      });
    } catch (err) {
      return res.status(422).json({ message: err.message });
    }
  },
  getAllRecipes: function (req, res) {
    Recipe.find({}, function (err, data) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(data);
    });
  },
  getTypeRecipes: function (req, res) {
    var type = req.params.type;

    Recipe.find({ type: type }, function (err, data) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(data);
    });
  },
  getRecipe: function (req, res) {
    var id = req.params.id;

    Recipe.findOne({ _id: id }, function (err, data) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(data);
    });
  },
  updateRecipe: function (req, res) {
    var id = req.params.id;
    var title = req.body.title;
    var description = req.body.description;
    var img = getImagegPath(req);
    var ingredients = req.body.ingredients;
    var showIngredients = req.body.showIngredients;

    Recipe.findOne({ _id: id }, function (err, updatedRecipe) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (img) {
        deleteImageFromPublicFolder(updatedRecipe.img);
      }

      updatedRecipe.title = title;
      updatedRecipe.description = description;
      updatedRecipe.img = img || updatedRecipe.img;

      if (!showIngredients) {
        updatedRecipe.ingredients = [];
      } else if (ingredients && ingredients.length > 0) {
        updatedRecipe.ingredients = ingredients;
      } else {
        updatedRecipe.ingredients = updatedRecipe.ingredients;
      }
  
      updatedRecipe.save(function (err) {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.status(201).json(updatedRecipe);
      });
    });
  },
  deleteRecipe: function (req, res) {
    var id = req.params.id;

    Recipe.findOne({ _id: id }, function (err, recipe) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      var recipeImage = recipe && recipe.img;

      if (recipeImage) {
        deleteImageFromPublicFolder(recipeImage);
      }

      Recipe.deleteOne({ _id: id }, function (err) {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.sendStatus(204);
      });
    });
  }
};
