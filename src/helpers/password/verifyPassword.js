const bcrypt = require("bcrypt");

const verifyPassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch {
    throw new Error("Error al verificar la contraseña.");
  }
};

module.exports = verifyPassword;
