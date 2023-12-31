const { User } = require("../../db");
const {
  ERROR_400,
  ERROR_404,
  SUCCESS_200,
} = require("../../constants/responses.constants");

const addFollow = async (req, res) => {
  const { targetUsername } = req.params;
  const { username: currentUsername } = req.user;

  if (currentUsername === targetUsername)
    return res.status(ERROR_400.statusCode).json({ error: ERROR_400.message });

  try {
    const targetUserFound = await User.findByPk(targetUsername);

    if (!targetUserFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const currentUserFound = await User.findByPk(currentUsername);

    if (!currentUserFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    await targetUserFound.addFollowers(currentUserFound);
    await currentUserFound.addFollowing(targetUserFound)

    return res
      .status(SUCCESS_200.statusCode)
      .json({ message: SUCCESS_200.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = addFollow;
