const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

//posting to this route will attempt to log a user in with the credentials they provide in the login form
router.get('/', async(req,res)=>{
        res.render("pages/login");
});

router.post('/', async(req,res)=>{

    const currentusername = req.body.username;
    const currentpassword = req.body.password;
    const error_msg = 'Invalid username or passsword';
    if(!currentusername || typeof currentusername !== "string")
    {
        res.render('pages/login', {error_msg:error_msg});
        return;
    }
    // console.log(currentusername);
    // console.log(currentpassword);
    // let user = await users.findExistingUser(currentusername);
    // let userjson = JSON.stringify(user);
    // console.log('userjson is:' + userjson);
    // let username = userjson.username;
    // let password = userjson.password;
    // console.log('user info is:' + userjson);
    // console.log('username passed:'+ username);
    // console.log('password passed:'+ password);
    // console.log("existing user" + user);
    

    const validatedData = await users.checkstatus(currentusername, currentpassword);
    if(validatedData.status===true){
        res.cookie('AuthCookie', {userId:validatedData.userId}); 
        res.redirect('/search');
    }
    else if(validatedData.status === false){
        res.render('pages/login', {error_msg: error_msg});
    }

});


module.exports = router;

































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
//     error_message = "Username or password incorrect!";

//     const validatedData = await checkstatus(currentusername, currentpassword);
//     console.log('validation is:' + validatedData);
//     if(validatedData === true){
//         //let name = validatedData.username;
//         res.cookie('AuthCookie', userInfo._id);
//         res.redirect('/search'); 
//     }
//     else{
//         res.render('pages/login', {error_message: error_message});
//     }


// });


// module.exports = router;// const express = require("express");
// const router = express.Router();
// const uuid = require("uuid/v4");
// const userData = require("../data/users");
// //hash password
// //const bcrypt = require('bcrypt');



// //function to checkstatus
// async function checkstatus(username, password) {
//     // get userinfo from userdata
//     console.log('came in check status function');
//     userInfo = await userData.findExistingUser(username);
//     console.log('userInfo recieved is:' + JSON.stringify(userInfo));
//     //userInfo = JSON.stringify(userInfo);
//     //console.log('second userInfo recieved is:' + userInfo);
//     // for(var i = 0; i <= userData.length-1, i++){
//     //         //here you need hash password...see towards that
//     //         if(userInfo.password === password){
//     //             if(username && password){
//     //                 console.log('true  user password matched' + password);
//     //                 return true;
//     //             } else {
//     //                 return false;
//     //             }

//     //             }
                
            
//     //     }
//     }




//     username = userInfo.username;
//     console.log('username is ' + username);
//     password = userInfo.password;

//     if (password === userInfo.password) {
//         password = userInfo.password;
//     }
//     console.log('password ' + password);
//     //console.log('password is:' + password);
//     //check both userInfo exist && password correct
//     if (username && password) {
//         if (username && password) {
//             console.log('true ' + password);
//             return true;
//         } else {
//             return false;
//         }
//     }
// }

// //for existing user this router.get is needed
// router.get("/", async(req,res) => {
//     res.render("pages/login");
// });

// router.post("/", async(req,res) => {
//     //request username & password to login
//     var username = req.body.username;
//     var password = req.body.password;
//     //var authenticated = false;
//     var error_message = "Username or password incorrect!";
//     console.log('inside router.post of login');
    
//         const authenticated = await checkstatus(username,password)
//         if(authenticated === true){
//             console.log('page ');
//             //create cookie
//             res.cookie("AuthCookie", userInfo._id);
//             res.redirect("search");

//         }
//         //otherwise  render to login page && display error
//         else{
//              res.render("pages/login",{error_message: error_message});
//         }

// });

// //also we need to add register

// module.exports = router;

// //============================================

// // if(!username || typeof username !== String || username === null){
// //     throw "Provide a proper username";
// // }

// // if(!password || typeof password !== String || password === null){
// //     throw "Provide a password";
// // }
//=============================================