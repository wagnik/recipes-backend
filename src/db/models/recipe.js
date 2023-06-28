var mongoose = require('mongoose');

var RecipeSchema = new mongoose.Schema({
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
    type: {
      id: {
        type: String,
        required: false,
      },
      name: {
        type: String,
        required: false,
      }
    },
    required: false
  }
})

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;