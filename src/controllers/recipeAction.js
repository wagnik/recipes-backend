const Recipe = require('../db/models/recipe');

module.exports = {
  saveRecipe: async function(req, res) {
    const body = req.body;
    console.log(body)
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
    const body = req.body.body;
    const img = req.body.img;
    const tags = req.body.tags;
    let updatedRecipe;

    try {
      updatedRecipe = await Recipe.findOne({ _id: id})
      updatedRecipe.title = title || updatedRecipe.title;
      updatedRecipe.body = body || updatedRecipe.body;
      updatedRecipe.img = img || updatedRecipe.img;
      console.log(Array.isArray(tags) && tags.length > 0, tags, tags.length)
      if(Array.isArray(tags) && tags.length > 0) updatedRecipe.tags = tags ?? updatedRecipe.tags;
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