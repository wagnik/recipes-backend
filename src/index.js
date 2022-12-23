require('dotenv').config();
const session = require('express-session')
const express = require("express");
const cors = require("cors");
const MongoDBStore =  require('connect-mongodb-session')(session)
const recipeRouter = require("./routes/recipeApi");
const userRouter = require("./routes/userApi");
const { PORT, DATABASE } = require("./config");

//db
require('./db/mongoose');

const app = express();
const MAX_AGE = 1000 * 60 * 60 * 3 // 3hrs

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
}

const mongoDBstore = new MongoDBStore({
  uri: DATABASE,
  collection: 'MySS',
})
app.set("trust proxy", 1);  

app.use(
  session({
    secret: 'test',
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
)

app.use(cors(corsOptions))
app.use(express.json())

//routers
app.use('/api', userRouter);
app.use('/api', recipeRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})

module.exports = app
