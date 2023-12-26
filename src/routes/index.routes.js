const { Router } = require("express");
const userRouter = require("./User.routes");
const postRouter = require("./Post.routes");
const commentRouter = require("./Comment.routes");

const router = Router();

router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);

module.exports = router;
