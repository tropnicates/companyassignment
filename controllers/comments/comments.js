const Comment = require("../../models/comment/comment");
const Post = require("../../models/post/Post");
const User = require("../../models/user/User");
const appErr = require("../../utils/appErr");

const createCommentCtrl = async (req, res, next) => {
  const { message } = req.body;
  try {

    const post = await Post.findById(req.params.id);

    const comment = await Comment.create({
      user: req.session.userAuth,
      message,
      post: post._id,
    });

    post.comments.push(comment._id);

    const user = await User.findById(req.session.userAuth);

    user.comments.push(comment._id);

    await post.save({ validateBeforeSave: false });
    await user.save({ validateBeforeSave: false });
    console.log(post);

    res.redirect(`/api/v1/posts/${post._id}`);
  } catch (error) {
    next(appErr(error));
  }
};


const commentDetailsCtrl = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.render("comments/updateComment", {
      comment,
      error: "",
    });
    console.log("comment", comment);
  } catch (error) {
    res.render("comments/updateComment", {
      error: error.message,
    });
  }
};


const deleteCommentCtrl = async (req, res, next) => {
  console.log(req.query.postId);
  try {

    const comment = await Comment.findById(req.params.id);

    if (comment.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this comment", 403));
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.redirect(`/api/v1/posts/${req.query.postId}`);
  } catch (error) {
    next(appErr(error));
  }
};


const upddateCommentCtrl = async (req, res, next) => {
  try {
    console.log("query", req.query);

    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(appErr("Comment Not Found"));
    }

    if (comment.user.toString() !== req.session.userAuth.toString()) {
      return next(appErr("You are not allowed to update this comment", 403));
    }

    const commentUpdated = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        message: req.body.message,
      },
      {
        new: true,
      }
    );


    res.redirect(`/api/v1/posts/${req.query.postId}`);
  } catch (error) {
    next(appErr(error));
  }
};

module.exports = {
  createCommentCtrl,
  commentDetailsCtrl,
  deleteCommentCtrl,
  upddateCommentCtrl,
};
