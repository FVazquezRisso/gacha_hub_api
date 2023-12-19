const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        allowNull: false,
        validate: {
          len: {
            args: [4, 15],
            msg: "El nombre de usuario debe tener entre 4 y 15 caracteres.",
          },
          is: {
            args: /^[a-zA-Z0-9_]+$/i,
            msg: "El nombre de usuario sólo puede contener letras mayúsculas, letras minúsculas, números y guiones bajos",
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      profileImageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://proyectoidis.org/wp-content/uploads/2021/06/avatar-default.png",
      },

      role: {
        type: DataTypes.ENUM("admin", "mod", "user"),
        allowNull: false,
        defaultValue: "user",
      },

      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      discordUsername: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      paranoid: true,
    }
  );
};
