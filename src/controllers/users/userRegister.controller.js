const { User } = require("../../db");
const passwordEncrypt = require("../../helpers/password/passwordEncrypt");
const {
  ERROR_409,
  ERROR_500,
  SUCCESS_201,
} = require("../../constants/responses.constants");

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userFound = await User.findByPk(username);

    if (userFound)
      return res
        .status(ERROR_409.statusCode)
        .json({ error: ERROR_409.message });

    const newUser = {
      username,
      password: await passwordEncrypt(password),
    };

    const createdUser = await User.create(newUser);

    if (!createdUser)
      return res
        .status(ERROR_500.statusCode)
        .json({ error: ERROR_500.message });

    return res
      .status(SUCCESS_201.statusCode)
      .json({ message: SUCCESS_201.message });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = register;
