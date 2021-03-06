const express = require('express');
const router = express.Router();
const bookData = require("../data/books");
const users = require("../data/users");


router.post("/", async (req, res) => {
    console.log("in post method of bookinfo");
    console.log(req.body);
    var bookId = req.body.bookId;
    var review = req.body.review;
    var rating = req.body.rating;
    let reviews = [];
    try {
        let user = await users.getUser(req.cookies.AuthCookie);
        console.log(user);
        const insertInfo = await bookData.getBooksByID(bookId);
       // console.log(insertInfo);
        if (insertInfo) {
            console.log("book exists");

            const existingBook = await bookData.addReviews(user._id, user.username, bookId, review);
            const updateRating = await bookData.addRating(user._id, user.username, bookId, rating);
            const addedavg = await bookData.calculateAvgRating( bookId, updateRating);
        }
        else {
            console.log("book DOESNOT exists");
            const addedBook = await bookData.addBook(bookId);
            const addedReview = await bookData.addReviews(user._id, user.username, bookId, review);
            const addedRating = await bookData.addRating(user._id, user.username, bookId, rating);
            const addedavg = await bookData.calculateAvgRating( bookId, addedRating);
        }
        const newInfo = await bookData.getBooksByID(bookId);
        reviews=newInfo.reviews;
        avgRating=newInfo.avgRating;
        res.render("pages/bookinfo",
        {
            bookId:bookId,
            reviews: reviews,
            rating:avgRating,
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