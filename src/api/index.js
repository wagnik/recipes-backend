const express = require("express");
const router = express.Router();

router.get("/api", (req, res) => {
  res.json({ message: "Hello from Express"});
})

module.exports = router;