const { Router } = require("express");
const { validateRegisterUser, validateLoginUser } = require("../validators/user.validator");
const userRegister = require("../controllers/users/userRegister.controller");
const userLogin = require("../controllers/users/userLogin.controller");

const userRouter = Router();

userRouter.post("/register", validateRegisterUser, userRegister);

userRouter.post("/login", validateLoginUser, userLogin);

module.exports = userRouter;
