const { Router } = require("express");
const auth = require("../middlewares/authentication");
const addFollow = require('../controllers/follows/addFollow.controller')
const removeFollow = require('../controllers/follows/removeFollow.controller')

const followRouter = Router();

followRouter.post("/:targetUsername", auth, addFollow);

followRouter.delete("/:targetUsername", auth, removeFollow);

module.exports = followRouter;
