const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Group",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: "El campo contenido debe tener entre 2 y 50 caracteres.",
          },
        },
      },
    },
    {
      paranoid: true,
    }
  );
};
