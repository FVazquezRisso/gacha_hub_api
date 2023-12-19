const { check } = require("express-validator");
const validateResult = require("../helpers/validateResult");
const validationMessages = require("../constants/validationMessages.constants");

const validateRegisterUser = [
  check("username")
    .exists()
    .notEmpty()
    .withMessage(validationMessages.IS_EMPTY)
    .isLength({ min: 4, max: 15 })
    .withMessage(validationMessages.IS_LENGTH_RANGE(4, 15))
    .matches(/^[a-zA-Z0-9_]+$/i)
    .withMessage(validationMessages.IS_USERNAME),

  check("password")
    .exists()
    .notEmpty()
    .withMessage(validationMessages.IS_EMPTY)
    .isLength({ min: 8, max: 100 })
    .withMessage(validationMessages.IS_LENGTH_RANGE(8, 100))
    .matches(/^(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S{8,100}$/g)
    .withMessage(validationMessages.IS_PASSWORD),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateLoginUser = [
  check("username")
    .exists()
    .notEmpty()
    .withMessage(validationMessages.IS_EMPTY),

  check("password")
    .exists()
    .notEmpty()
    .withMessage(validationMessages.IS_EMPTY),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateRegisterUser,
  validateLoginUser,
};
