const { Group, User } = require("../../db");
const {
  ERROR_404,
  ERROR_500,
  SUCCESS_201,
  ERROR_409,
} = require("../../constants/responses.constants");

const createGroup = async (req, res) => {
  const { name } = req.body;
  const { username } = req.user;
  try {
    const userFound = await User.findByPk(username);

    if (!userFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const groupFound = await Group.findOne({ where: { name } });

    if (groupFound)
      return res
        .status(ERROR_409.statusCode)
        .json({ error: ERROR_409.message });

    const createdGroup = await Group.create({ name });

    if (!createdGroup)
      return res
        .status(ERROR_500.statusCode)
        .json({ error: ERROR_500.message });

    createdGroup.addUser(userFound);

    return res
      .status(SUCCESS_201.statusCode)
      .json({ message: SUCCESS_201.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = createGroup;
