var Post = require("../models/post");
var Comment = require("../models/comment");
var User = require("../models/user");

exports.getNewReply = (req, res, next) => {
  // NEW REPLY
  var currentUser = req.user;
  let post;
  Post.findById(req.params.postId).lean()
    .then(p => {
      post = p;
      return Comment.findById(req.params.commentId).lean();
    })
    .then(comment => {
      res.render("replies/replies-new", { post, comment, currentUser });
    })
    .catch(err => {
      console.log(err.message);
    });
}

exports.addNewReply = (req, res, next) =>{
  const reply = new Comment(req.body);
    reply.author = req.user._id
    // LOOKUP THE PARENT POST
    Post.findById(req.params.postId)
        .then(post => {
            // FIND THE CHILD COMMENT
            Promise.all([
                reply.save(),
                Comment.findById(req.params.commentId),
            ])
                .then(([reply, comment]) => {
                    // ADD THE REPLY
                    comment.comments.unshift(reply._id);

                    return Promise.all([
                        comment.save(),
                    ]);
                })
                .then(() => {
                    res.redirect(`/posts/${req.params.postId}`);
                })
                .catch(console.error);
            // SAVE THE CHANGE TO THE PARENT DOCUMENT
            return post.save();
        })
}