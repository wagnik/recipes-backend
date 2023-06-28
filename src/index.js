require('dotenv').config();
var session = require('express-session');
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var MongoDBStore =  require('connect-mongodb-session')(session);
var uuidv4 = require('uuid').v4;

var recipeRouter = require("./routes/recipeApi");
var userRouter = require("./routes/userApi");

var PORT = require("./config").PORT;
var DATABASE = require("./config").DATABASE;

//db
require('./db/mongoose');

var app = express();
var MAX_AGE = 1000 * 60 * 60 * 3; // 3hrs

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

var mongoDBstore = new MongoDBStore({
  uri: DATABASE,
  collection: 'session',
});
app.set("trust proxy", 1);  

app.use(
  session({
    secret: uuidv4(),
    name: 'session-id',
    store: mongoDBstore,
    proxy: true,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
      secure: false, 
    },
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors(corsOptions));
app.use(express.json());

//routers
app.use('/api', userRouter);
app.use('/api', recipeRouter);
app.use('/js/recipes-backend/public', express.static('public'));

app.listen(PORT, function() {
  console.log("Server listening on " + PORT);
});

module.exports = app;
