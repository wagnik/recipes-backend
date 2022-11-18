const Recipe = require('./../db/models/recipe');

module.exports = {
  saveRecipe: function(req, res) {

    const newRecipe = new Recipe({title: 'Nalesniki', body: 'PRZEPIS'});

newRecipe.save().then(() => {
  console.log('przepis został zapisany')
})
  }
}