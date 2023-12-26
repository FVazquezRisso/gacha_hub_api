const { User } = require("../../db");
const {
  ERROR_400,
  ERROR_404,
  ERROR_403,
  ERROR_500,
  SUCCESS_204,
} = require("../../constants/responses.constants");

const changeUserInfo = async (req, res) => {
  const userToModify = req.params.username;
  const { username, role } = req.user;
  const { bio, discordUsername } = req.body;
  try {
    if (!bio && !discordUsername)
      return res
        .status(ERROR_400.statusCode)
        .json({ error: ERROR_400.message });

    if (userToModify !== username && role !== "admin")
      return res
        .status(ERROR_403.statusCode)
        .json({ error: ERROR_403.message });

    const userFound = await User.findByPk(userToModify);

    if (!userFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const modifiedUser = await User.update(
      { bio, discordUsername },
      { where: { username: userToModify } }
    );

    if (!modifiedUser)
      return res
        .status(ERROR_500.statusCode)
        .json({ error: ERROR_500.message });

    return res
      .status(SUCCESS_204.statusCode)
      .json({ message: SUCCESS_204.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = changeUserInfo;
