const express = require("express");
const router = express.Router();

router.get("/asdffff", async (req, res) => {
  res.send("Hello");
});

module.exports = router;
