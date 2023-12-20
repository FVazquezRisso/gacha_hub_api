const { Router } = require("express");
const auth = require('../middlewares/authentication')
const { validateCreatePost, validateEditPost } = require("../validators/post.validator");
const createPost = require('../controllers/posts/createPost.controller')
const editPost = require('../controllers/posts/editPost.controller')
const deletePost = require('../controllers/posts/deletePost.controller')
const getAllPosts = require('../controllers/posts/getAllPosts.controller')
const getPostById = require('../controllers/posts/getPostById.controller')
const likePost = require('../controllers/posts/likePost.controller')

const postRouter = Router();

postRouter.post("/", auth, validateCreatePost, createPost);

postRouter.patch("/:id", auth, validateEditPost, editPost);

postRouter.delete("/:id", auth, deletePost);

postRouter.get('/', getAllPosts)

postRouter.get("/:id", getPostById);

postRouter.post('/like/:id', auth, likePost)

module.exports = postRouter;
