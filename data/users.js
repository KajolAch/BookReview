const mongoCollections = require("../config/mongoCollections");
const uuid = require("uuid/v4");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;



const createUser = async function createUser(username, password, name,birth, email,phone,gender) {
   console.log(password);
    if (typeof password !== "string") throw "please provide a password!";
    // let hash = await bcrypt.hash(password, saltRounds);
    //console.log(hash);
    try {
        let ID = uuid();
        let newInfo = {
            _id: ID,
            username: username,
            password: password,
            name: name,
            gender: gender,
            birth: birth,
            email: email,
            phone: phone,
        };
       // console.log(newInfo);
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

    if (!id)
        throw "Please provide a userid";

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

    //here I need to check if my collection contains username
    try {
        const userCollection = await users();
        const userInfoWeNeeded = await userCollection.findOne({ username : username });
        
        if( userInfoWeNeeded !== null){
            return userInfoWeNeeded;
        }
        else{
            return {msg: "Provided username does not exists! Please reenter username or register first"};
        }
        
    }
    catch (err) {
        console.log(err);
    }
}

const checkstatus = async function checkstatus(username, password){
    //username to be checked.....in getexisting user
    userInfo = await findExistingUser(username);
    if(username === userInfo.username && password === userInfo.password){
        console.log(true);
        return {status:true,userid:userInfo._id};
    }
    else{
        return {status:false, msg:"Invalid username or password"};
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
    //console.log("d0");
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
    updateUser,
    removeUser,
    checkPassword,
    checkstatus
};