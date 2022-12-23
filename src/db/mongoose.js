const mongoose = require('mongoose');
const { DATABASE } = require('./../config/index');

mongoose.Promise = global.Promise
mongoose.connect(DATABASE, {
  useNewUrlParser: true, useUnifiedTopology: true
});
