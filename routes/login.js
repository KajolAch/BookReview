const express = require('express');
const router = express.Router();
const data = require('../data');
const users = data.users;

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