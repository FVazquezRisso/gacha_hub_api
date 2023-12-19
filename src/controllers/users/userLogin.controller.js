const { User } = require("../../db");
const verifyPassword = require("../../helpers/password/verifyPassword");
const jwt = require("jsonwebtoken");
const { ERROR_401, ERROR_404 } = require("../../constants/responses.constants");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const userFound = await User.findByPk(username);

    if (!userFound) return res.status(ERROR_404.statusCode).json({ error: ERROR_404.message })

    const passwordVerified = await verifyPassword(password, userFound.password);

    if (!passwordVerified) return res.status(ERROR_401.statusCode).json({ error: ERROR_401.message });

    const payload = {
      username,
      role: userFound.role,
      isVerified: userFound.isVerified,
    };

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY);
    return res.json({ token });
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = login;
