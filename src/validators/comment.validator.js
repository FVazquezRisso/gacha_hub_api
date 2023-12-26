const { check } = require("express-validator");
const validateResult = require("../helpers/validateResult");
const validationMessages = require("../constants/validationMessages.constants");

const validateCreateComment = [
  check("content")
    .exists()
    .withMessage(validationMessages.IS_EMPTY)
    .notEmpty()
    .isLength({ min: 5, max: 200 })
    .withMessage(validationMessages.IS_LENGTH_RANGE(5, 200)),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateCreateComment };
