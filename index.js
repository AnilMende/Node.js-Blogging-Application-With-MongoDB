const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

// connecting to mongodb
mongoose
       .connect('mongodb://localhost:27017/blogify')
       .then((event) => console.log("MongoDB Connected"));

const userRoute = require('./routes/user.route.js');
const PORT = process.env.PORT;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', (req, res) => {
    res.render("home");
})

app.use('/users', userRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));