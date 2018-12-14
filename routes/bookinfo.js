const express = require('express');
const router = express.Router();
const bookData = require("../data/books");
const users=require("../data/users");

router.post("/", async(req,res) =>{
    console.log("in post method of bookinfo");
    console.log(req.body);
    var bookId=req.body.bookId;
    var review=req.body.review;
    var rating=req.body.rating;    
    
    try{    
        let user=await users.getUser(req.cookies.AuthCookie);      
        console.log(user);           
        const insertInfo = await destCollection.getBooksByID(bookId);
        console.log(insertInfo);
        if(insertInfo){
            console.log("book exists");
            await bookData.addComments();        }    
        else{
        const reviewCreated = await bookData.addBookReview(bookId,review,rating,user._id,user.username);
        }
        res.render("pages/bookinfo");//change
    }catch(e){
        error_message = "Please dont leave empty blank";
    }
});

module.exports = router;