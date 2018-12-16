const express = require('express');
const router = express.Router();
const bookData = require("../data/books");
const users = require("../data/users");
const xss = require('xss');


router.post("/", async (req, res) => {
    // console.log("in post method of bookinfo");
    // console.log(req.body);
    var bookId = xss(req.body.bookId);
    var review = xss(req.body.review);
    var rating = xss(req.body.rating);
    let reviews = [];
    try {
        let user = await users.getUser(req.cookies.AuthCookie);
        //console.log(user);
        const insertInfo = await bookData.getBooksByID(bookId);
       // console.log(insertInfo);
        if (insertInfo) {
            console.log("book exists");

            const existingBook = await bookData.addReviews(user._id, user.username, bookId, xss(review));

        }
        else {
            console.log("book DOESNOT exists");
            const addedBook = await bookData.addBook(bookId,xss(rating));

            const addedReview = await bookData.addReviews(user._id, user.username, bookId, xss(review));
        }
        const newInfo = await bookData.getBooksByID(bookId);
        reviews=newInfo.reviews;
        res.render("pages/bookinfo",
        {
            bookId:bookId,
            reviews: reviews,
            hasReviews: true
        })
        // if (reviews.length > 0) {
        //     res.render("pages/bookinfo",
        //         {
        //             reviews: reviews,
        //             hasReviews: true
        //         }
        //     );
        // }
    }
    catch (e) {
        error_message = "Please dont leave empty blank";
    }
});

module.exports = router;