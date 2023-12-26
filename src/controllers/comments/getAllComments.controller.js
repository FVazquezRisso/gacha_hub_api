const { Post, Comment, User } = require("../../db");
const { ERROR_404 } = require("../../constants/responses.constants");

const getAllComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const postFound = await Post.findByPk(postId);

    if (!postFound)
      res.status(ERROR_404.statusCode).json({ error: ERROR_404.message });

    const allComments = await Comment.findAll({
      where: { PostId: postId },
      order: [["createdAt", "DESC"]],
    });

    const commentPromises = allComments.map(async (comment) => {
      const userFound = await User.findByPk(comment.UserUsername, {
        attributes: {
          exclude: [
            "password",
            "bio",
            "discordUsername",
            "isVerified",
            "createdAt",
            "deletedAt",
            "updatedAt",
          ],
        },
      });

      if (!userFound)
        res.status(ERROR_404.statusCode).json({ error: ERROR_404.message });

      const commentWithoutUsername = {
        ...comment.toJSON(),
        author: userFound,
      };

      delete commentWithoutUsername.UserUsername;

      return commentWithoutUsername;
    });

    const commentsWithAuthors = await Promise.all(commentPromises);

    return res.status(200).json(commentsWithAuthors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllComments;
