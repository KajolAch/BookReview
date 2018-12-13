const express = require("express");
const router = express.Router();
const uuid = require("uuid/v4");
const userData = require("../data/users");
//hash password
//const bcrypt = require('bcrypt');



//function to checkstatus
async function checkstatus(username, password) {
    if(!username || typeof username !== String || typeof username === null){
        throw "Provide a proper username"
    }

    // get userinfo from userdata
    
    userInfo = await userData.findExistingUser(username);
    
    username = userInfo.username;
    
    password = userInfo.password;

    if (password === userInfo.password) {
        password = userInfo.password;
    }
    console.log('password ' + password);
    
    if (username && password) {
        if (username && password) {
            console.log('true ' + password);
            return true;
        } else {
            return false;
        }
    }
}

//for existing user this router.get is needed
router.get("/", async(req,res) => {
    res.render("pages/login");
});

router.post("/", async(req,res) => {
    //request username & password to login
    var username = req.body.username;
    var password = req.body.password;
    //var authenticated = false;
    var error_message = "Username or password incorrect!";
    console.log('inside router.post of login');
    
        const authenticated = await checkstatus(username,password)
        if(authenticated === true){
            console.log('page ');
            //create cookie
            res.cookie("AuthCookie", userInfo._id);
            res.redirect("search");

        }
        //otherwise  render to login page && display error
        else{
             res.render("pages/login",{error_message: error_message});
        }

});

//also we need to add register

module.exports = router;
