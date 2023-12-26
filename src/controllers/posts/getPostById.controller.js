const { Post, User } = require("../../db");
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

    const usersWhoCommented = await postFound.getComments()
    const commentCount = usersWhoCommented.length

    let userLikedPost = false;

    if (username) {
      userLikedPost = await postFound.hasUser(username);
    }

    const author = await User.findByPk(postFound.UserUsername, {
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

    if (!author)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const { UserUsername, ...postDataWithoutUsername } = postFound.dataValues;

    return res
      .status(200)
      .json({ ...postDataWithoutUsername, author, likeCount, userLikedPost, commentCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPostById;
