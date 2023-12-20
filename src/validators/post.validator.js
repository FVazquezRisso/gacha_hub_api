const { check } = require("express-validator");
const validateResult = require("../helpers/validateResult");
const validationMessages = require("../constants/validationMessages.constants");

const validateCreatePost = [
  check("content")
    .exists()
    .withMessage(validationMessages.IS_EMPTY)
    .notEmpty()
    .isLength({ min: 10, max: 1000 })
    .withMessage(validationMessages.IS_LENGTH_RANGE(10, 1000)),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateEditPost = [
  check("id").exists().notEmpty().withMessage(validationMessages.IS_EMPTY),

  check("content")
    .exists()
    .notEmpty()
    .withMessage(validationMessages.IS_EMPTY)
    .isLength({ min: 10, max: 1000 })
    .withMessage(validationMessages.IS_LENGTH_RANGE(10, 1000)),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreatePost, validateEditPost };
