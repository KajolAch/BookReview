const express = require('express');
const router = express.Router();
const bookData = require("../data/books");

router.post("/", async(req,res) =>{
    console.log("in post method of bookinfo");
    console.log(req.body);
    var bookId=req.body.bookId;
    var review=req.body.review;
    var rating=req.body.rating;    
    
    try{                                          
       const reviewCreated = await bookData.addBookReview(bookId,review,rating);
        res.render("pages/bookinfo",
        {
            reviewCreated:reviewCreated
        });
    }catch(e){
        error_message = "Please dont leave empty blank";
    }
});

module.exports = router;