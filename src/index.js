const express = require("express");
const { PORT } = require("./config");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
//db
require('./db/mongoose');

// routers
const recipeRouter = require("./routes/recipeApi");
const userRouter = require("./routes/userApi");

//parsers
app.use(bodyParser.json({ limit: "50mb"  }));

//fix cors
app.use(cors());

app.use('/api', recipeRouter);
app.use('/api', userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})