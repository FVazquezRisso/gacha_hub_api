const { Group, Post } = require("../../db");
const { ERROR_400, ERROR_404 } = require("../../constants/responses.constants");

const getGroupById = async (req, res) => {
  const { groupId } = req.params;
  const { username } = req.query;
  try {
    if (!groupId)
      return res
        .status(ERROR_400.statusCode)
        .json({ error: ERROR_400.message });

    const groupFound = await Group.findByPk(groupId);

    if (!groupFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const userCount = await groupFound.countUsers();
    const postCount = await Post.count({ where: { GroupId: groupId } });

    let userJoined = false;

    if (username) {
      userJoined = await groupFound.hasUser(username);
    }

    return res
      .status(200)
      .json({ ...groupFound.dataValues, userCount, postCount, userJoined });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getGroupById;
