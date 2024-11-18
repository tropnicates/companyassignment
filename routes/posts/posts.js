const express = require("express");
const multer = require("multer");
const storage = require("../../config/cloudinary");
const {
  createPostCtrl,
  deletePostCtrl,
  fetchPostCtrl,
  fetchPostsCtrl,
  updatepostCtrl,
} = require("../../controllers/posts/posts");
const postRoutes = express.Router();
const protected = require("../../middlewares/protected");
const Post = require("../../models/post/Post");


const upload = multer({
  storage,
});



postRoutes.get("/get-post-form", (req, res) => {
  res.render("posts/addPost", { error: "" });
});

postRoutes.get("/get-form-update/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("posts/updatePost", { post, error: "" });
  } catch (error) {
    res.render("posts/updatePost", { error, post: "" });
  }
});

postRoutes.post("/", protected, upload.single("file"), createPostCtrl);

postRoutes.get("/", fetchPostsCtrl);

postRoutes.get("/:id", fetchPostCtrl);

postRoutes.delete("/:id", protected, deletePostCtrl);

postRoutes.put("/:id", protected, upload.single("file"), updatepostCtrl);

module.exports = postRoutes;
