const express = require('express');
const multer = require('multer');
const path = require('path');

const Blog = require('../models/blogs.js');
const Comment = require('../models/comment.js');

const { route } = require('./user.route.js');

const router = express.Router();

// for uploading the images we are using the multer
// with the help of DiskStorage which gives you full control on storing files to disk
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {

    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({storage : storage});

router.get('/add-new', (req, res) => {
    return res.render('addBlog',{
        user:req.user,
    })
})

// get blog by an id i.e.dynamic route
router.get('/:id', async(req, res) => {
  
  const id = req.params.id;
  const blog = await Blog.findById(id).populate("createdBy");
  // console.log("blog", blog);
  // adding the comments to the frontend
  const comments = await Comment.find({ blogId : id}).populate('createdBy');
  // console.log('comments', comments);

  return res.render('blog',{
    user: req.user,
    blog,
    comments,
  })
})

// creating a new blog or adding a new blog
router.post('/',upload.single('coverImage'), async (req, res) => {
    
    const { title, body} = req.body;

    // Here we are creating a blog
    const blog = await Blog.create({
        body,
        title,
        createdBy : req.user._id,
        coverImageURL : `/uploads/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`);
})

// for creating a comment
router.post('/comment/:blogId', async(req, res) => {
  await Comment.create({
    content : req.body.content,
    blogId : req.params.blogId,
    createdBy : req.user._id
  });

  return res.redirect(`/blog/${req.params.blogId}`);
})


module.exports = router;