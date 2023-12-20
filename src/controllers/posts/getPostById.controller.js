const { Post } = require("../../db");
const { ERROR_400, ERROR_404 } = require("../../constants/responses.constants");

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { username } = req.query;
  try {
    if (!id)
      return res
        .status(ERROR_400.statusCode)
        .json({ error: ERROR_400.message });

    const postFound = await Post.findByPk(id);

    if (!postFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const usersWhoLiked = await postFound.getUsers();
    const likeCount = usersWhoLiked.length;

    let userLikedPost = false;

    if (username) {
      userLikedPost = await postFound.hasUser(username);
    }

    return res
      .status(200)
      .json({ ...postFound.dataValues, likeCount, userLikedPost });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPostById;
