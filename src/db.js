const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// deploy
const { DB_URL } = process.env;
const sequelize = new Sequelize(DB_URL, {
  logging: false,
  native: false,
});

// // local
// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
// const sequelize = new Sequelize("gacha_hub", DB_USER, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: "mariadb",
//   logging: false,
//   native: false,
// });

// Cargamos los archivos de modelos dinámicamente
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, "models", file))(sequelize);
    modelDefiners.push(model);
  });

// Extraemos los modelos:
const { User, Post, Comment } = sequelize.models;

// Ceramos las relaciones entre los modelos
User.hasMany(Post);
User.belongsToMany(Post, { through: "Likes" });
Post.belongsToMany(User, { through: "Likes" });

Comment.belongsTo(User);
Comment.belongsTo(Post);
User.hasMany(Comment);
Post.hasMany(Comment);

User.belongsToMany(User, {
  as: "Followers",
  through: "Follow",
  foreignKey: "followerId",
});

User.belongsToMany(User, {
  as: "Following",
  through: "Follow",
  foreignKey: "followedId",
});

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
