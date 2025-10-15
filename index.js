const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user.route.js');
const { checkForAuthenticationCookie } = require('./middlewares/authentication.js');

const app = express();
const PORT = process.env.PORT;

// connecting to mongodb
mongoose
       .connect('mongodb://localhost:27017/blogify')
       .then((event) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middlewares
// app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get('/', (req, res) => {
    res.render("home",{
        user : req.user,
    });
})

app.use('/users', userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));