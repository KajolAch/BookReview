// const express = require("express");
// const router = express.Router();
// const uuid = require("uuid/v4");
// const userData = require("../data/users");

// router.get('/', async(req,res)=>{
//     res.render("pages/login");
// });

// router.post('/', async(req, res)=>{
//     var currentusername = req.body.username;
//     var currentpassword = req.body.password;
//     var error_message = "Username or password incorrect!";

//     const validatedData = await userData.checkstatus(currentusername, currentpassword);
//     if(validatedData.status === true){
//         //let name = validatedData.username;
//         res.cookie('AuthCookie', userInfo._id);
//         res.redirect('/search');
//     }
//     else{
//         res.render('pages/login', {error_msg: error_msg});
//     }


// });

// async function checkstatus(username, password){
//     //username to be checked.....in getexisting user
//     const userInfo = await userData.findExistingUser(username);
//     console.log('userinfo is:' + userInfo);
//     const userInfoRecieved = JSON.stringify(userInfo);
//     //uncomment this while checking for hashed password
//     //if(bcrypt.compareSync(password, userInfoRecieved.password) )
//     if(password === userInfoRecieved.password){
//         return {status: true} ;
//     }
//     else{
//         return {status: false, message: 'Invalid username or password'};
//     }

// }
// module.exports = router;