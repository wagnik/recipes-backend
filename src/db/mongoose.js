var mongoose = require('mongoose');
var config = require('./../config/index');

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});