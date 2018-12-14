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
        //console.log(true);
        return {status:true,userid:userInfo._id};
    }
    else{
        return {status:false, msg:"Invalid username or password"};
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

const updateUser = async function updateUser(userInfo) {

    console.log('came in updateuser');
    console.log('userinfo recieced is:' + userInfo);
    var userCollection = await users();
    const tobeupdatedUser = {
        _id: userInfo._id,
        username: userInfo.username,
        password: userInfo.password,
        name: userInfo.name,
        gender: userInfo.gender,
        birth: userInfo.birth,
        email: userInfo.email,
        phone: userInfo.phone
    };
    console.log('going to update in db');
    const updatedUserInfo = await userCollection.replaceOne({username: userInfo.username}, tobeupdatedUser );
    if(updatedUserInfo.modifiedCount === 0){
        throw 'to be updated recipe not updated properly in the database';
    }
    else{ 
        console.log('came in else of updateuser');
        return {status: true};
    }

}

async function updatePassword(username, password, newpassword) {
    //console.log("d0");
    //let hash = await bcrypt.hash(password, saltRounds);
    //console.log(hash);
    //try {
        
        console.log('came in update password');
        userInfo = await findExistingUser(username);
        
        console.log('name is'+ userInfo.username);
        console.log( 'pass is'+userInfo.password);
        if(username === userInfo.username && password === userInfo.password){
            // console.log('came in if of  update password');
            //here first calculate hash of new pass word and then check that pass !== newpassword
            if(userInfo.password !== newpassword){
                userInfo.password = newpassword;
                // console.log('new taken password:' + userInfo.password);
                // console.log('userinfo after making change' + userInfo);
                //now make this changes to db now
                changes = await updateUser(userInfo);
                // console.log('came back in update password');
                if(changes.status === true){
                    return {status: true,  msg: "Password change was successfull!!!" };
                }
                else{
                    return {status: false,  msg: "Password change was unsuccessfull!!!" };
                }

            }
            else{
                console.log('came in else of if...');
                return {status: false,  msg: "Old Password and new password cannot be same!!!" };
            }
                
        }
        else{
            // console.log('came in else of second if...');
            return {status: false,  msg: "Old Password and new password cannot be same!!!" };
        }
    
}

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    findExistingUser,
    updateUser,
    removeUser,
    updatePassword,
    checkstatus 
};