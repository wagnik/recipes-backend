const express = require("express");
const { PORT } = require("./config");
const app = express();
const bodyParser = require("body-parser");

//db
require('./db/mongoose');

// routers
const apiRouter = require("./routes");

//parsers
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})