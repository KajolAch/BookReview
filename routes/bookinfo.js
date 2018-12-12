const express = require('express');
const router = express.Router();


//bring up the data from mongodb or api
const bookData = require("../data/books");

router.get("/", async(req,res) =>{
    // console.log(res);
    // res.render("pages/bookinfo");
    
    // //represent the bookinfo  && check if it in db
    // var bookinfo = await bookData.getBookByName(bookname);
    // var exist = bookinfo !== undefined;

    // if(exist){
    //     var data = {
    //         //title return bookname
    //         title: bookinfo.bookname,
    //         review: bookinfo.reviews,
    //         rating : bookinfo.rating
    //     }
    //     res.render('bookinfo',data);
    // }else{
    //     var data = {
    //         title : "book is not exist",
    //         description: "type another book"
    //     }
    //     res.status(403).render("error",data)
    // }

})
router.post("/", async(req,res) =>{
    console.log("in post method of bookinfo");
    console.log(req.body);
    var bookId=req.body.bookId;
    var review=req.body.review;
    var rating=req.body.rating;    
    
    try{
                                                
        reviewCreated = await bookData.addBookReview(bookId,review,rating);
    }catch(e){
        error_message = "Please dont leave empty blank";
    }
});

module.exports = router;