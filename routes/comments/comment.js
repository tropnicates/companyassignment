const express = require("express");
const {
  createCommentCtrl,
  commentDetailsCtrl,
  deleteCommentCtrl,
  upddateCommentCtrl,
} = require("../../controllers/comments/comments");
const protected = require("../../middlewares/protected");
const commentRoutes = express.Router();


commentRoutes.post("/:id", protected, createCommentCtrl);


commentRoutes.get("/:id", commentDetailsCtrl);


commentRoutes.delete("/:id", protected, deleteCommentCtrl);


commentRoutes.put("/:id", protected, upddateCommentCtrl);

module.exports = commentRoutes;
