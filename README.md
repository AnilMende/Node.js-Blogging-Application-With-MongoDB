A full-stack blogging platform built using Node.js, Express, and MongoDB, featuring secure authentication, user-generated content, and a clean modular design.
This project allows users to read, post, and comment on blogs, with dedicated Sign Up / Sign In pages and structured blog layouts.Used POSTMAN to test the APIs.

FEATURES:

User Authentication:
Secure Sign-Up and Sign-In using password hashing.
Authentication required for posting blogs and comments.

Blog Management:
Users can create, read, and view blogs.
Each blog includes an image, title, and information section.
Blogs are stored and retrieved from MongoDB.

Comments Functionality:
Authenticated users can add comments to any blog.
All users can view comments under each post.

Dynamic Routing:
Different routes for each major page: Home, Blog Details, Sign-In, and Sign-Up.
Clean and modular route structure handled by Express Router.

Templating & UI
Views rendered using EJS (or your templating engine).
Responsive design ensuring a smooth user experience.

TECH STACK USED:
Backend - Node.js, Express.js
Database - MondoDB, Mongoose
Frontend - EJS/HTML/CSS
Authentication - bcrypt, JWT
Environment - dotenv
Version Control - Git & Github
