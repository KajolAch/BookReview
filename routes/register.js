const express = require("express");
const router = express.Router();
const userData = require("../data/users");

router.get("/", async(req,res) => {
    res.render("pages/register");
});

router.post("/", async(req,res) =>{
 
    console.log("In post register method");
    console.log(req.body);
    let RegisterData = req.body;
    var username = RegisterData.username;
    var password = RegisterData.password;
    var name = RegisterData.fullname;
    var gender = req.body.gender;
    var email = req.body.email;
    var birth = req.body.date;
    var phone = req.body.phone;
    let errors = [];
  if (!username) {
    errors.push("No username provided!");
    res.status(400);
  }
  if (!password) {
    errors.push("No password provided!");
    res.status(400);
  }
  if (!name) {
    errors.push("No name provided!");
    res.status(400);
  }
    let user=await userData.findExistingUser(username);
    if(user)
    {
     console.log("username matched");   
     errors.push("Username already exists. Try another user name! ");
     res.status(400);
    }
    else{
        console.log("same username not found");
    }
  if (errors.length > 0) {
    res.render("pages/register", {
      errors: errors,
      hasErrors: true
    });
    return;
  }
    //check status
    var error_message = "Account already exists.";
    try{                                         
        userCreated = await userData.createUser(username,password,name,birth,email,phone,gender);
    }catch(e){
        res.status(400).json({ error: e });
    }

    if(username === userCreated.username){
        var data={
            error:error_message
        }
        res.cookie('AuthCookie', userCreated._id, { maxAge: 3600000 }); //set cookie for unique username
        res.redirect("/search"); // redirect after db entry
        // res.render("pages/search",{
        //    userId: userCreated._id
        // });
    }else{
        res.redirect("search");
    }
})

module.exports = router;