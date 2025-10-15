const express = require('express');
const router = express.Router();

const USER = require('../models/users.js');

// these routes works as the static routes
router.get('/signin', (req, res) => {
    return res.render("signin");
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})

// To create a new user
router.post("/signup", async (req, res) => {
    const {fullName, email, password} = req.body;
    await USER.create({
        fullName,
        email,
        password
    });
    return res.redirect("/");
})

// To login as the existing user
router.post("/signin", async (req, res) => {
    const {email, password} = req.body;

    try{
        const token = await USER.matchPasswordAndGenToken(email, password);

        return res.cookie("token", token).redirect("/")

    }catch(error){
        return res.render("signin",{
            error : "Incorrect email or password"
        })
    }
})

// for logout we clear the existing cookie and 
// redirect to the home page
router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
})


module.exports = router;