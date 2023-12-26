const { User, Post, Comment } = require("../../db");
const { ERROR_404, ERROR_500, SUCCESS_201 } = require("../../constants/responses.constants");

const createComment = async (req, res) => {
  const { content } = req.body;
  const { postId } = req.params
  const { username } = req.user;
  try {
    const userFound = await User.findByPk(username);

    if (!userFound) return res.status(ERROR_404.statusCode).json({ error: ERROR_404.message })

    const postFound = await Post.findByPk(postId);

    if (!postFound) return res.status(ERROR_404.statusCode).json({ error: ERROR_404.message });

    const comment = {
      content,
      PostId: postId,
      UserUsername: username,
    };

    const createdComment = await Comment.create(comment);

    if (!createdComment) return res.status(ERROR_500.statusCode).json({ error: ERROR_500.message });

    return res.status(SUCCESS_201.statusCode).json({ message: SUCCESS_201.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createComment;
