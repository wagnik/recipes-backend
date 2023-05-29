const Recipe = require('../db/models/recipe');

module.exports = {
  saveRecipe: async function(req, res) {
    const body = req.body;
    let newRecipe;

    try {
      newRecipe = new Recipe(body);
      await newRecipe.save();
    } catch ( err ) {
      return res.status(422).json({ message: err.message })
    }

    res.status(201).json(newRecipe);
  },
  getAllRecipes: async function(req, res) {
    let data;

    try {
      data = await Recipe.find({});
    } catch ( err ) {
      return res.status(500).json({ message: err.message })
    }

    res.status(200).json(data);
  },
  getTypeRecipes: async function(req, res) {
    let data;
    const type = req.params.type;

    try {
      data = await Recipe.find({ type: type });
    } catch ( err ) {
      return res.status(500).json({ message: err.message })
    }

    res.status(200).json(data);
  },
  getRecipe: async function(req, res) {
    let data;
    const id = req.params.id;

    try {
      data = await Recipe.findOne({ _id: id})
    } catch ( err ) {
      return res.status(500).json({ message: err.message })
    }
    
    res.status(200).json(data);
  },
  updateRecipe: async function(req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const img = req.body.img;
    const ingredients = req.body.ingredients;
    const type = req.body.type;
    const showIngredients = req.body.showIngredients;
    let updatedRecipe;

    try {
      updatedRecipe = await Recipe.findOne({ _id: id})
      updatedRecipe.title = title || updatedRecipe.title;
      updatedRecipe.description = description || updatedRecipe.description;
      updatedRecipe.img = img || updatedRecipe.img;
      updatedRecipe.ingredients = !showIngredients ? [] : ingredients && ingredients.length > 0 ? ingredients : updatedRecipe.ingredients;
      if(Array.isArray(type) && type.length > 0) updatedRecipe.type = type ?? updatedRecipe.type;
      await updatedRecipe.save()
    } catch ( err ) {
      return res.status(500).json({ message: err.message });
    }

    res.status(201).json(updatedRecipe);
  },
  deleteRecipe: async function(req, res) {
    const id = req.params.id;

    try {
      await Recipe.deleteOne({ _id: id });
    } catch ( err ) {
      return res.status(500).json({ message: err.message });
    }

    res.sendStatus(204);
  }
}