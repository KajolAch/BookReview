const express = require("express");
const router = express.Router();
const userData = require("../data/users");
const destData = require("../data/books");
const { getUserFromCookie } = require("../public/js/cookieFunctions");

router.get("/:_id", async (req, res) =>{
    let user = await getUserFromCookie(req);
    try{
        let _id = req.params._id;

        let dest = await destData.getBookByID(_id);

        var data = {
            user,
            dest
        };

        res.render("singlebook", data)

    } catch (e) {
		let errorNum = 404;
		let data = {
			errorNum: errorNum,
			description: "this book not in the database"
		}
		res.status(errorNum).render("error", data);
	}
});

router.post("/addComment", async (req, res)=>{
    let user = await getUserFromCookie(req);
    let pid = req.headers.referer;
    console.log(pid.length);
    if(pid[pid.length-1] == '/'){
        pid = pid.substr(0, pid.length-1);
    }
    let _id = pid.substr(pid.lastIndexOf('/') +1);

    let dest = await destData.getBookByID(_id);
    let text = req.body.comments;
    console.log(_id);
    console.log(text);
    await destData.addComments(dest, text);
    res.redirect("/singleDest/" + _id);
});

router.post("/addrate", async (req, res)=>{
    let user = await getUserFromCookie(req);
    let pid = req.headers.referer;
    console.log(pid.length);
    if(pid[pid.length-1] == '/'){
        pid = pid.substr(0, pid.length-1);
    }
    let _id = pid.substr(pid.lastIndexOf('/') +1);

    let dest = await destData.getBookByID(_id);
    let text = req.body.comments;
    console.log(_id);
    console.log(text);
    await destData.addComments(dest, text);
    res.redirect("/singlebook/" + _id);
});

module.exports = router;