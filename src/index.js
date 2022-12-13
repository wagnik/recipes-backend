const express = require("express");
const { PORT } = require("./config");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
//db
require('./db/mongoose');

// routers
const apiRouter = require("./routes");

//parsers
app.use(bodyParser.json());

//fix cors
app.use(cors());

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})