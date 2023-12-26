const { Router } = require("express");
const { validateCreateComment } = require("../validators/comment.validator");
const auth = require('../middlewares/authentication')
const createComment = require('../controllers/comments/createComment.controller')
const getAllComments = require('../controllers/comments/getAllComments.controller')

const commentRouter = Router();

commentRouter.post("/:postId", auth, validateCreateComment, createComment);

commentRouter.get("/:postId", getAllComments);

module.exports = commentRouter;
