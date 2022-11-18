const express = require("express");
const { PORT } = require("./config");

const app = express();
// routers
const apiRouter = require("./api");

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})