const { Post, User } = require("../../db");
const {
  ERROR_404,
  SUCCESS_204,
} = require("../../constants/responses.constants");

const likePost = async (req, res) => {
  const { username } = req.user;
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);

    if (!post)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const user = await User.findByPk(username);

    if (!user)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const isLiked = await post.hasUser(user);

    if (isLiked) await post.removeUser(user);
    else await post.addUser(user);

    return res
      .status(SUCCESS_204.statusCode)
      .json({ message: SUCCESS_204.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = likePost;
