const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false
  },
  ingredients: [{
    type: String,
    required: false,
  }],
  showIngredients: {
    type: Boolean,
    required: false,
  },
  type: [{
    type: String,
    required: false
  }],
  author: {
    type: Object,
    required: false
  }
})

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;