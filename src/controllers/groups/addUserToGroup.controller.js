const { User, Group } = require('../../db')
const { ERROR_404, SUCCESS_204 } = require('../../constants/responses.constants')

const addUserToGroup = async (req, res) => {
  const { groupId } = req.params
  const { username } = req.user 
  try {
    const groupFound = await Group.findByPk(groupId)

    if (!groupFound) return res.status(ERROR_404.statusCode).json({ error: ERROR_404.message })

    const userFound = await User.findByPk(username)

    if (!userFound) return res.status(ERROR_404.statusCode).json({ error: ERROR_404.message })

    await groupFound.addUser(userFound)

    return res.status(SUCCESS_204.statusCode).json({ message: SUCCESS_204.message })
  } catch (error) {
   return res.status(500).json({ error: error.message }) 
  }
}

module.exports = addUserToGroup