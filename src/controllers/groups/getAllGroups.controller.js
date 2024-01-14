const { Group, User, Post } = require("../../db");
const { ERROR_404 } = require("../../constants/responses.constants.js");
const { Op } = require("sequelize");

const getAllGroups = async (req, res) => {
  const { username, name } = req.query;
  try {
    if (username) {
      const user = await User.findByPk(username);

      if (!user) {
        return res
          .status(ERROR_404.statusCode)
          .json({ error: ERROR_404.message });
      }

      const userGroups = await user.getGroups();

      const groupsWithInfo = await Promise.all(
        userGroups.map(async (group) => {
          const userCount = await group.countUsers();
          const postCount = await Post.count({ where: { GroupId: group.id } });

          return {
            ...group.toJSON(),
            userCount,
            postCount,
          };
        })
      );

      return res.status(200).json(groupsWithInfo);
    }

    const where = name ? { name: { [Op.like]: `%${name}%` } } : {};

    const allGroups = await Group.findAll({ where, limit: 20 });

    const groupsWithInfo = await Promise.all(
      allGroups.map(async (group) => {
        const userCount = await group.countUsers();
        const postCount = await Post.count({ where: { GroupId: group.id } });

        return {
          ...group.toJSON(),
          userCount,
          postCount,
        };
      })
    );

    return res.status(200).json(groupsWithInfo);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllGroups;
