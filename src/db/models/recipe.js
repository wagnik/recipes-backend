const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
})

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;