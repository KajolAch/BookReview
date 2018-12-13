const express = require("express");
const router = express.Router();
// call from user data
const userData = require("../data/users");

router.get("/", async(req,res) => {
    res.render("pages/register");
});

router.post("/", async(req,res) =>{
    
    //console.log(req.body);
    let RegisterData = req.body;
    var username = RegisterData.username;
    var password = RegisterData.password;
    var name = RegisterData.fullname;
    var gender = req.body.gender;
    var email = req.body.email;
    var birth = req.body.date;
    var phone = req.body.phone;

    //check status

    try{
                                                
        userCreated = await userData.createUser(username,password,name,birth,email,phone,gender);
    }catch(e){
        error_message = "Please dont leave empty blank";
    }

    if(userCreated.username === username){
        res.redirect('/search');
        
    }
    else{
        res.render('pages/register');
    }
});


module.exports = router;