const { Router } = require("express");
const auth = require('../middlewares/authentication')
const { validateCreatePost } = require("../validators/post.validator");
const createPost = require('../controllers/posts/createPost.controller')

const userRouter = Router();

userRouter.post("/", auth, validateCreatePost, createPost);

module.exports = userRouter;
