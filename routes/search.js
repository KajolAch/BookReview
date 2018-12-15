const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //console.log("in search.js get");
  if(req.cookies.AuthCookie)
  {
    res.render("pages/search");
  }
  else
  {
    res.redirect("/login");
  }
});

module.exports = router;
