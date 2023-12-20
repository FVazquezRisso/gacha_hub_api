const { Post } = require("../../db");
const {
  ERROR_404,
  ERROR_403,
  ERROR_500,
  SUCCESS_204,
} = require("../../constants/responses.constants");

const deletePost = async (req, res) => {
  const { username, role } = req.user;
  const { id } = req.params;
  try {
    const postFound = await Post.findByPk(id);

    if (!postFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    if (
      postFound.UserUsername !== username &&
      role !== "mod" &&
      role !== "admin"
    )
      return res
        .status(ERROR_403.statusCode)
        .json({ error: ERROR_403.message });

    const deletedPost = await Post.destroy({ where: { id } });

    if (!deletedPost)
      return res
        .status(ERROR_500.statusCode)
        .json({ error: ERROR_500.message });

    return res
      .status(SUCCESS_204.statusCode)
      .json({ error: SUCCESS_204.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deletePost;
