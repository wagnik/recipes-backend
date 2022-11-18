const mongoose = require('mongoose');
const { DATABASE } = require('./../config/index');

mongoose.connect(DATABASE, {
  useNewUrlParser: true, useUnifiedTopology: true
});
