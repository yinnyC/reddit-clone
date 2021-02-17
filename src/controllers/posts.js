const Post = require('../models/post');
const User = require('../models/user')

exports.newPostForm = (req, res, next) => {
  var currentUser = req.user;
  return res.render('posts/posts-new',{currentUser})
}

exports.newPost = (req, res, next) => {
  if (req.user) {
    data = req.body
    data['author'] = req.user._id
    var post = new Post(data);
    post
    .save()
    .then(post => {
      return User.findById(req.user._id);
    })
    .then(user => {
        user.posts.unshift(post);
        user.save();
        // REDIRECT TO THE NEW POST
        res.redirect(`/posts/${post._id}`);
    })
    .catch(err => {
        console.log(err.message);
    });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
}

exports.postDetails = (req, res, next) => {
  Post.findById(req.params.id).lean().populate({path:'comments', populate: {path: 'author'}}).populate('author')
    .then(post => {
      res.render('posts/posts-show', { post })
    })
    .catch(err => {
      throw err.message
    })
}

exports.getPostsBySubreddit  = (req,res,next) =>{
  console.log(req.params.subreddit)
  Post.find({subreddit:req.params.subreddit}).lean().populate('author')
  .then((posts)=>{
    console.log(posts)
    res.render("posts/posts-index",{ posts })
  })
  .catch((err)=>{
    console.log(err)
  })
}