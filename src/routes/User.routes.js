const { Router } = require("express");
const { validateRegisterUser, validateLoginUser, validateChangeUserInfo } = require("../validators/user.validator");
const userRegister = require("../controllers/users/userRegister.controller");
const userLogin = require("../controllers/users/userLogin.controller");
const getUserByUsername = require('../controllers/users/getUserByUsername.controller')
const auth = require("../middlewares/authentication");
const changeUserInfo = require('../controllers/users/changeUserInfo.controller')

const userRouter = Router();

userRouter.post("/register", validateRegisterUser, userRegister);

userRouter.post("/login", validateLoginUser, userLogin);

userRouter.get('/:username', getUserByUsername)

userRouter.patch('/:username', auth, validateChangeUserInfo, changeUserInfo)

module.exports = userRouter;
