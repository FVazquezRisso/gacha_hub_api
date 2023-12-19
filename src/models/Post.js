const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.INTEGER,  
        autoIncrement: true,
        primaryKey: true,
      },

      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [10, 1000],
            msg: 'El campo contenido debe tener entre 10 y 1000 caracteres.',
          },
        },
      },
    },
    {
      paranoid: true,
    }
  );
};
