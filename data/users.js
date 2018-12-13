const mongoCollections = require("../config/mongoCollections");
const uuid = require("uuid/v4");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;


const createUser = async function createUser(username, password, name,birth, email,phone,gender) {
   // console.log(password);
    if (typeof password !== "string") throw "please provide a password!";
    let hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
    try {
        let ID = uuid();
        let newInfo = {
            _id: ID,
            username: username,
            password: hash,
            name: name,
            gender: gender,
            birth: birth,
            email: email,
            phone: phone,
        };
        console.log(newInfo);
       const userCollection = await users();
        const insertInfo = await userCollection.insertOne(newInfo);

        if (insertInfo.insertedCount === 0)
            throw "this user is not added";

        const thisUser = await this.getUser(ID);
        console.log(thisUser.name);
        console.log(thisUser.password);
        return thisUser;
    }

    catch (err) {
        console.log(err);
    }

}
const getAllUsers = async function getAllUsers() {
    try {   
        const userCollection = await users();
        const allUsers = await userCollection.find({}).toArray();
        console.log(allUsers);
        return allUsers;
    }

    catch (err) {
        console.log(err);
    }

}

const getUser = async function getUser(id) {

    if (!id) throw "Please provide a userid";

    try {
        const userCollection = await users();
        const find_user = await userCollection.findOne({ _id: id });

        if (find_user === null)
            throw "There is not have this user";

        return find_user;
    }

    catch (err) {
        console.log(err);
    }

}

//finding user with its username provided
const findExistingUser = async function findExistingUser(username) {
    console.log('username recieved is:' + username);
    if (!username)
        throw "Please provide a username";
    try {
        console.log('came in try of find existing user');
        const userCollection = await users();
        console.log('user collection contauins' + userCollection);
        console.log('returning from usercollection');
        const userInfoWeNeeded = await userCollection.findOne({ username : username });
        console.log('needed user info: ' + userInfoWeNeeded);
        return userInfoWeNeeded;
    }
    catch (err) {
        console.log(err);
    }
}



const updateUser = async function updateUser(userId, input, bookname) {

    if (!userId)
        throw "Please provide a userid";

    try {
        const userCollection = await users();
        const user_his = await userCollection.findOne({ _id: id });
        var newHistory = {
            input: input,
            bookname: bookname
        };

        user_his.history.push(newHistory);
        return await this.getUser(userId);
    }

    catch (err) {
        console.log(err);
    }

}

const removeUser = async function removeUser(id) {

    if (!id)
        throw "Please provide a userid";

    try {

        const userCollection = await users();
        const deletionInfo = await userCollection.removeOne({ _id: id });

        if (deletionInfo.deletedCount === 0)
            throw `Could not delete the user with id of ${id}`;

        return true;
    }

    catch (err) {
        console.log(err);
    }

}

const checkPassword = async function checkPassword(username, password) {
    console.log("d0");
    let hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
    console.log(username);
    console.log(password);
    try {
        //var user = await getExistingUser(username);

    } catch (error) {
        console.log("error");
        return false;
    }
    if (user) {
        try {
            var res = (user && await bcrypt.compare(password, user.password));
            console.log(password);
            console.log(user.name);
            console.log(res);
            if (res) {
                return true;
            }
            return false;
        } catch (e) {
            throw e;
        }
    } 
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    findExistingUser,
    //getExistingUser
    updateUser,
    removeUser,
    checkPassword
};