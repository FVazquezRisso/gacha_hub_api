const { check } = require("express-validator");
const validateResult = require("../helpers/validateResult");
const validationMessages = require("../constants/validationMessages.constants");

const validateCreateGroup = [
  check("name")
    .exists()
    .withMessage(validationMessages.IS_EMPTY)
    .notEmpty()
    .isLength({ min: 2, max: 50 })
    .withMessage(validationMessages.IS_LENGTH_RANGE(2, 50)),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];



module.exports = { validateCreateGroup };
