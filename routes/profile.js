const express = require("express");
const router = express.Router();
const data = require('../data');
const users = data.users;


router.get('/', async(req, res)=>{
    res.render('pages/changepassword');
});

router.post('/', async(req, res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const newpassword = req.body.newpassword;
    const error_msg = 'Password change unsuccessfull. Try Again!!!';
    const success_msg = 'Password changed successfully!!!';

    const changedData = await users.updatePassword(username, password, newpassword);
    //console.log('changedData is:' + changedData.status);

    if(changedData.status===true){
        res.render('pages/changepassword', {success_msg: success_msg});
        return;
    }
    else if(changedData.status === false){
        res.render('pages/changepassword', {error_msg: error_msg});
        return;
    }

});

module.exports = router;