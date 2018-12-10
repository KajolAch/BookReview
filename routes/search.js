const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/search");
});
router.post("/",(req,res) => {
  res.redirect("bookinfo");
});
module.exports = router;
