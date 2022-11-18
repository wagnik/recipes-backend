const mongoose = require('mongoose');

const Recipe = mongoose.model("Recipe", {
  title: String,
  body: String,
})

module.exports = Recipe;