const { Post, User } = require("../../db");

const getAllPosts = async (req, res) => {
  const { page = 1, pageSize = 10, author, username } = req.query;
  try {
    const offset = (page - 1) * pageSize;

    const where = author ? { UserUsername: author } : {};

    const posts = await Post.findAll({
      limit: Number(pageSize),
      offset,
      where,
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
        commentCount
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
