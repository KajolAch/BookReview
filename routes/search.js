// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.render("pages/search");
// });
// router.post("/",(req,res) => {
//   res.redirect("bookinfo");
// });
// module.exports = router;
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/search");
});
// router.post("/",(req,res) => {
//   console.log("Inside post");
//   console.log(req.body);
//   const SearchBook= req.body.BookName;
//   console.log(SearchBook);
//   if(SearchBook==""){
//     throw 'Enter a book name';
//   }
 
//   res.redirect("bookinfo");

// });
module.exports = router;