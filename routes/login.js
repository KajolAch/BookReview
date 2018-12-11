const express = require("express");
const router = express.Router();
const uuid = require("uuid/v4");
//hash password
const bcrypt = require('bcrypt');



//function to checkstatus
async function checkstatus(username,password){
    // get userinfo from userdata
    var userInfo = await userData.getUserByUsername(username);

    // here has problem with userInfo password.
    // We have to check whether we have to convert password to hashed password;
    var password = await bcrypt.compare(password, userInfo.hashedpassword);

    //check both userInfo exist && password correct
    if( userInfo && password){
        return true;
    }else{
        return false;
    }
}

router.post("/", async(req,res) => {
    //request username & password to login
    var username = req.body.username;
    var password = req.body.password;
    var authenticated = false;

    //if user input wrong message
    var error_message = "";
    try{
        authenticalted = await checkstatus(username,password)
    }catch(e){
        error_message =" Incorrect username/password, please try again!";
    }

    //create cookie
    if(authenticated){
        const userInfo = await userData.getUserByUsername(username);
        res.cookie("AuthCookie", userInfo.uuid());

        //once user login, turn page to w.e page we are going to give
        res.redirect("/")
    }
    //otherwise  render to login page && display error
    else{
        var data ={
            title: "Home",
            error: error_message
        }

        res.render("login",data);
    }

});

//also we need to add register...aao typed this...

module.exports = router;

