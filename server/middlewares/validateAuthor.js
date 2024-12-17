const { body } = require('express-validator');

const validateAuthor = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Author name is required')
    .isLength({ max: 100 })
    .withMessage('Author name must be less than 100 characters'),
];

module.exports = validateAuthor;