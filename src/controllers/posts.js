const Post = require('../models/post');

exports.newPostForm = (req, res, next) => {
  var currentUser = req.user;
  return res.render('posts/posts-new',{currentUser})
}

exports.newPost = (req, res, next) => {
  if (req.user) {
    var post = new Post(req.body);

    post.save(function(err, post) {
      return res.redirect(`/`);
    });
  } else {
    return res.status(401); // UNAUTHORIZED
  }
}


exports.postDetails = (req, res, next) => {
  Post.findById(req.params.id).lean().populate('comments')
    .then(post => {
      res.render('posts/posts-show', { post })
    })
    .catch(err => {
      throw err.message
    })
}

exports.getPostsBySubreddit  = (req,res,next) =>{
  console.log(req.params.subreddit)
  Post.find({subreddit:req.params.subreddit}).lean()
  .then((posts)=>{
    console.log(posts)
    res.render("posts/posts-index",{ posts })
  })
  .catch((err)=>{
    console.log(err)
  })
}