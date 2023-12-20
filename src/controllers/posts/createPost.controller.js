const { Post, User } = require("../../db");
const {
  ERROR_404,
  ERROR_500,
  SUCCESS_201,
} = require("../../constants/responses.constants");

const createPost = async (req, res) => {
  const { content } = req.body;
  const { username } = req.user;
  try {
    const userFound = await User.findByPk(username);

    if (!userFound)
      return res
        .status(ERROR_404.statusCode)
        .json({ error: ERROR_404.message });

    const post = {
      content,
      UserUsername: username,
    };

    const createdPost = await Post.create(post);

    if (!createdPost)
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

module.exports = createPost;
