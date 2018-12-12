const express = require("express");
const router = express.Router();
const uuid = require("uuid/v4");
const userData = require("../data/users");
//hash password
//const bcrypt = require('bcrypt');



//function to checkstatus
async function checkstatus(username,password){
    // get userinfo from userdata
    console.log('came in check status function');
    var userInfo = await userData.findExistingUser(username);   
    console.log('userInfo recieved is:' + userInfo);
    username = userInfo[0].username;
    console.log('username is ' + username);
    password = userInfo[0].password;

    if(password === userInfo.password){
        password =  userInfo.password;
    }

    //console.log('password is:' + password);
    //check both userInfo exist && password correct
    if( username && password){
        return true;
    }else{
        return false;
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
        if(authenticated.status === true){
            //create cookie
            res.cookie("AuthCookie", userInfo.uuid());
            res.redirect("pages/search");

        }
        //otherwise  render to login page && display error
        else{
             res.render("pages/login",{error_message: error_message});
        }

});

//also we need to add register

module.exports = router;
