const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;
const users=require("./users");
const uuid = require("uuid/v4");

async function getBooksByName(name) {
    if (!name) throw "No book name provided";
    const destCollection = await books();
    return await destCollection.find({ name: name }).toArray();
}

async function getBooksByID(_id) {
    try {
        if (!_id || typeof _id !== "string") {
            throw "The id type is not fit";
        }
        let destCollection = await books();
        return await destCollection.findOne({
            _id: _id
        });
    } catch (e) {
        throw e;
    }
}


async function searchBooks(searchInfo) {
    try {
        if (!searchInfo || typeof searchInfo !== "string")
            return [];

        searchInfo = searchInfo.toLowerCase();
        let regEx = new RegExp('.*' + searchInfo + '.*', 'i');

        let destCollection = await books();


        let nameResult = await destCollection.find(
            {
                name: regEx
            }).toArray();

        return nameResult;

    } catch (e) {
        throw e;
    }
}

async function addBookReview(bookId,review,rating,userId,userName) {// pass user

    const destCollection = await books();
    console.log("in addBookReview");
    console.log(userName);
    console.log(userId);
    if (typeof review !== "string") throw "You should write a review";
    //const userDetails= await users.getUser(userId);
    
    const newbookReview={
        _id: uuid(),
        Bookid:bookId,
        rating:rating,
        review:[],
        userId: userId,
        userName: userName
    }
        console.log(newbookReview);
      // const userCollection = await users();
        const insertInfo = await destCollection.insertOne(newbookReview);

        if (insertInfo.insertedCount === 0)
            throw "this review is not added";
    
        const thisUser = await this.getBooksByID(_id);
        console.log(thisUser.rating);
        console.log(thisUser.review);
        return thisUser;
    
}

// async function loadAllBooks() {
//     for (var i = 0; i < bookList.length; i++) {
//         addbook(bookList[i]);

//     }
//     return true;
// }

async function addComments(book, text) {
    if (typeof text !== "string") throw "Your should write a comment";

    const newComment = {
        text: text
    };

    
    const destCollection = await books();

    let _id = book._id;
    destCollection.update(
        {_id: _id},
        {$set:
            {
                comments: newComment
            }
        }
    )
}

async function updateRating(book, score) {
    const num = book.numOfRating;
    const beforeRate = book.rating;
    book.rating = ((beforeRate * num) + score) / (num + 1);
    book.numOfRating++;

    return rating;
}

//loadAllBooks();

module.exports = {
    getBooksByName,
    getBooksByID,
    addComments,
    addBookReview,
    updateRating,
    // loadAllBooks,
    searchBooks
};