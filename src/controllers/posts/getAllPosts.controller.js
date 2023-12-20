const { Post } = require("../../db");

const getAllPosts = async (req, res) => {
  const { page = 1, pageSize = 10, username } = req.query;
  try {
    const offset = (page - 1) * pageSize;

    const where = username ? { UserUsername: username } : {};

    const posts = await Post.findAll({
      limit: Number(pageSize),
      offset,
      where,
      order: [["createdAt", "DESC"]],
    });

    const totalPosts = await Post.count({ where });

    return res.status(200).json({
      page: Number(page),
      pageSize: Number(pageSize),
      totalPosts,
      posts,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPosts;
