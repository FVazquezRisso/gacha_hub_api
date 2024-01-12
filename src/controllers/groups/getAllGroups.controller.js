const { Group, User } = require("../../db");
const { ERROR_404 } = require("../../constants/responses.constants.js");

const getAllGroups = async (req, res) => {
  const { username } = req.query;
  try {
    if (username) {
      const user = await User.findByPk(username);

      if (!user) {
        return res
          .status(ERROR_404.statusCode)
          .json({ error: ERROR_404.message });
      }

      const userGroups = await user.getGroups();

      return res.status(200).json(userGroups);
    }
    const allGroups = await Group.findAll();

    return res.status(200).json(allGroups);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllGroups;
