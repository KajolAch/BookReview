const mongodb = require("mongodb");
const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;
const users=require("./users");
const uuid = require("uuid/v4");

const listOfBooks = [
    {
        _id: uuid(),
        bookname: "example1",
        public_date: "06-06-2006",
        author: "humid continental",
        rating: 0,
        numOfRating: 0,
        comments: [],
        introduce: "add introduce to here",
    },
    {
        _id: uuid(),
        bookname: "example2",
        public_date: "06-06-2006",
        author: "oceanic",
        rating: 0,
        numOfRating: 0,
        comments: [],
        introduce: "add introduce to here",
    },
    {
        _id: uuid(),
        name: "example3",
        public_date: "06-06-2006",
        author: "temperate oceanic",
        rating: 0,
        numOfRating: 0,
        comments: [],
        introduce: "add introduce to here",
    },
    {
        _id: uuid(),
        name: "example4",
        public_date: "06-06-2006",
        author: "tropical",
        rating: 0,
        numOfRating: 0,
        comments: [],
        introduce: "add introduce to here",
    },
    {
        _id: uuid(),
        name: "example5",
        public_date: "06-06-2006",
        author: "oceanic",
        rating: 0,
        numOfRating: 0,
        comments: [],
        introduce: "add introduce to here",
    },

]



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

async function addBookReview(bookId,review, rating) {// pass user

    const destCollection = await books();
    // const newbook = {
    //     _id: bookId,
    //     name: Object.values(book)[0],
    //     public_date: Object.values(book)[1],
    //     author: Object.values(book)[2],
    //     rating: Object.values(book)[3],
    //     numOfRating: Object.values(book)[4],
    //     comments: Object.values(book)[5],
    //     introduce:Object.values(book)[6]
    // };
    if (typeof review !== "string") throw "Your should write a review";
    const userDetails= await users.getUser(userId);
    const newbookReview={
        _id: uuid.v4(),
        Bookid:bookId,
        rating:rating,
        persona:{
            id: userId,
            name: userDetails.username
        },
        review:review
        //userID should be added
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
    searchBooks,
    listOfBooks
};