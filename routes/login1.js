const express = require("express");
const router = express.Router();
const userData = require("../data/users")
const uuid = require('uuid/v4');

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async(req, res) =>
{
    const username = req.body.username;
    const password = req.body.password;
    let errors = [];

    var auth = false;
    try {
        console.log(username);
        console.log(password);
        auth = await userData.checkPassword(username, password);
        console.log(auth);
    } catch (e) {
        errors.push("The username or password is wrong");
        res.render("login", {
            errors: errors,
            hasErrors: true,
            error: e
        });
        return;
    }

    const tempUser = await userData.getExistingUser(username);
    console.log(tempUser);
    console.log(tempUser.name);
    console.log(tempUser.gender);
    if(auth) {
        var data = {
            username: tempUser.name, 
            gender: tempUser.gender,
            };
        res.render("profile",data);
    } else {
        res.redirect("/login");
    }
});

module.exports = router;

