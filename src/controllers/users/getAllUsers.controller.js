const { User } = require("../../db");
const { Op } = require("sequelize");

const getAllUsers = async (req, res) => {
  const { username } = req.query;
  try {
    const allUsers = await User.findAll({
      where: { username: { [Op.like]: `${username}%` } },
      attributes: {
        exclude: [
          "password",
          "banner",
          "discordUsername",
          "isVerified",
          "createdAt",
          "updatedAt",
          "deletedAt",
        ],
      },
    });

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllUsers;
