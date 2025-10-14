const express = require('express');
const router = express.Router();

const USER = require('../models/users.js');

router.get('/signin', (req, res) => {
    return res.render("signin");
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})

router.post("/signup", async (req, res) => {
    const {fullName, email, password} = req.body;
    await USER.create({
        fullName,
        email,
        password
    });
    return res.redirect("/");
})

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    const user = await USER.matchPassword(email, password);
    console.log("User", user);

    return res.redirect("/");
})



module.exports = router;