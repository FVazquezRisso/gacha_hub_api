const { User } = require("../../db");
const { ERROR_404 } = require("../../constants/responses.constants");

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const { username: currentUsername } = req.user;

  try {
    const currentUserFound = await User.findByPk(currentUsername);

    if (!currentUserFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const userFound = await User.findByPk(username, {
      attributes: { exclude: ["password"] },
    });

    if (!userFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const followers = await userFound.getFollowers();
    const following = await userFound.getFollowing();
    const followersCount = followers.length;
    const followingCount = following.length;

    const isFollowing = await currentUserFound.hasFollowing(userFound)

    return res
      .status(200)
      .json({ ...userFound.dataValues, followersCount, followingCount, isFollowing });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUserByUsername;
