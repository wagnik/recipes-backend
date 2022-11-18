const express = require("express");
const { PORT } = require("./config");
const app = express();

//db
require('./db/mongoose');

// routers
const apiRouter = require("./routes");

app.use('/', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})