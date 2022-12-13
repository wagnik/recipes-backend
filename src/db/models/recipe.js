const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: false,
  },
  img: {
    data: Buffer,
    contentType: String,
    required: false
  }
})

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;