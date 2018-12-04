const express = require('express');
const router = express.Router();


//bring up the data from mongodb or api
const bookData = require("___path");

router.get("/", async(req,res) =>{

    //represent the bookinfo  && check if it in db
    var booinfo = await bookData.getBookByName(bookname);
    var exist = bookinfo !== undefined;

    if(exist){
        var data = {
            //title return bookname
            title: bookinfo.bookname,
            review: bookinfo.reviews,
            rating : bookinfo.rating
        }
        res.render('bookinfo',data);
    }else{
        var data = {
            title : "book is not exist",
            description: "type another book"
        }
        res.status(403).render("error",data)
    }

})

module.exports = router;