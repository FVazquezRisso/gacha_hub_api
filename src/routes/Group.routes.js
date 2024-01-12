const { Router } = require("express");
const auth = require("../middlewares/authentication");
const { validateCreateGroup } = require("../validators/group.validator");
const createGroup = require('../controllers/groups/createGroup.controller');
const getAllGroups = require("../controllers/groups/getAllGroups.controller")
const addUserToGroup = require('../controllers/groups/addUserToGroup.controller')
const removeUserFromGroup = require('../controllers/groups/removeUserFromGroup.controller')

const groupRouter = Router();

groupRouter.post('/:groupId', auth, addUserToGroup)

groupRouter.delete("/:groupId", auth, removeUserFromGroup);

groupRouter.post("/", auth, validateCreateGroup, createGroup);

groupRouter.get('/', getAllGroups)

module.exports = groupRouter;
