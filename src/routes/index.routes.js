const { Router } = require("express");
const userRouter = require("./User.routes");
const postRouter = require("./Post.routes");
const commentRouter = require("./Comment.routes");
const followRouter = require("./Follow.routes");
const groupRouter = require("./Group.routes");

const router = Router();

router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);
router.use("/api/follows", followRouter);
router.use("/api/groups", groupRouter)

module.exports = router;