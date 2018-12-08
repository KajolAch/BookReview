const express = require("express");
const router = express.Router();

// call from user data
const userData = require("../data/users");

router.get("/", async(req,res) => {
    res.render("register");
});

router.post("/", async(req,res) =>{
    //get user info
    // I think so here name should also be added...as for registration page its needed
    var username = req.body.username;
    var password = req.body.password;
    var gender = req.body.gender;
    var email = req.body.email;
    var dob = req.body.dob;
    var phone = req.body.phone;

    //check status
    var error_message = "Account already exists.";

    try{
        userCreated = await userData.CreateUser(username,password,gender,email,dob,phone);
    }catch(e){
        error_message = "Please dont leave empty blank";
    }



    if(username === userData.username){
        var data={
            error:error_message
        }
        res.render("login", data);
    }else{
        res.redirect("login");
    }
})

module.exports = router;
//I think I missed something when user create an acc successfully