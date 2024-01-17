const { Post, User } = require("../../db");
const { Op } = require("sequelize");

const getAllPosts = async (req, res) => {
  const { page = 1, pageSize = 10, author, username, following, content, groupId } = req.query;
  try {
    let where = author ? { UserUsername: author } : {};

    if (following) {
      const currentUser = await User.findOne({ where: { username: following } });
      const followedUserIds = await currentUser
        .getFollowing()
        .then((users) => users.map((user) => user.username));

      where = { ...where, UserUsername: followedUserIds };
    }

     if (groupId) {
       where = { ...where, GroupId: groupId };
     }

    const offset = (page - 1) * pageSize;

    const posts = await Post.findAll({
      limit: Number(pageSize),
      offset,
      where: { ...where, content: { [Op.like]: `%${content || ''}%` } },
      order: [["createdAt", "DESC"]],
    });

    const postPromises = posts.map(async (post) => {
      const userFound = await User.findByPk(post.UserUsername, {
        attributes: {
          exclude: [
            "password",
            "bio",
            "discordUsername",
            "isVerified",
            "createdAt",
            "deletedAt",
            "updatedAt",
          ],
        },
      });

      const postWithoutUsername = {
        ...post.toJSON(),
        author: userFound.toJSON(),
      };

      const usersWhoLiked = await post.getUsers();
      const likeCount = usersWhoLiked.length;

      const usersWhoCommented = await post.getComments();
      const commentCount = usersWhoCommented.length;

      let userLikedPost = false;

      if (username) {
        userLikedPost = await post.hasUser(username);
      }

      return {
        ...postWithoutUsername,
        likeCount,
        userLikedPost,
        commentCount,
      };
    });

    const postsWithAuthorsAndLikes = await Promise.all(postPromises);

    const totalPosts = await Post.count({ where });

    return res.status(200).json({
      page: Number(page),
      pageSize: Number(pageSize),
      totalPosts,
      posts: postsWithAuthorsAndLikes,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPosts;
