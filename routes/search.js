const express = require("express");
const router = express.Router();

router.get("/search", (req, res) => {
  res.render("pages/search", {});
});

module.exports = router;
