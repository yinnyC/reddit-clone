const Post = require('../models/post');
const Comment = require('../models/comment');

exports.newComment = (req,res,next)=>{
  console.log(req.body)
  const comment = new Comment(req.body);
  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then(comment => {
      return Post.findById(req.params.postId);
    })
    .then(post=>{
      post.comments.unshift(comment)
      return post.save();
    })
    .then(post=>{
      res.redirect(`/`)
    })
    .catch(err => {
      console.log(err);
    });
}