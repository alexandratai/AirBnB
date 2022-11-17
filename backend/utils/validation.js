// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const validateReviews = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validateQueryParameters = [
  check("page")
    .optional()
    .exists({ checkFalsy: true })
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("Page must be greater than or equal to 0"),
  check("size")
    .optional()
    .exists({ checkFalsy: true })
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage("Size must be greater than or equal to 0"),
  check("minLat")
    .optional()
    .exists({ checkFalsy: true })
    .optional()
    .isDecimal()
    .withMessage("Minimum latitude is invalid"),
  check("maxLat")
    .optional()
    .exists({ checkFalsy: true })
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check("minLng")
    .optional()
    .exists({ checkFalsy: true })
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .optional()
    .exists({ checkFalsy: true })
    .optional()
    .isDecimal()
    .withMessage("Maximum longitude is invalid"),
  check("minPrice")
    .optional()
    .exists({ checkFalsy: true })
    .optional()
    .isDecimal()
    .isInt({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .exists({ checkFalsy: true })
    .optional()
    .isDecimal()
    .isInt({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateReview,
  validateReviews,
  validateQueryParameters,
  validateSpot,
  validateSignup
};