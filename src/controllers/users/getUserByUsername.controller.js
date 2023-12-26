const { User } = require("../../db");
const { ERROR_404 } = require("../../constants/responses.constants");

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const userFound = await User.findByPk(username, {
      attributes: { exclude: ["password"] },
    });

    if (!userFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    return res.status(200).json(userFound);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUserByUsername;
