// backend/routes/api/users.js
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Spot, Review, ReviewImage } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const review = require("../../db/models/review");

// const { requireAuth } = require('/../../utils/auth');

const router = express.Router();

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

// Sign up
router.post("/", validateSignup, async (req, res, next) => {
  const { email, password, username, firstName, lastName } = req.body;

  const existingUser = await User.findOne({
    where: {
      email,
    },
  });

  if (existingUser) {
    const err = new Error("User with that email already exists");
    err.status = 403;
    return next(err);
  }

  const user = await User.signup({
    email,
    username,
    password,
    firstName,
    lastName,
  });
  user.dataValues.token = await setTokenCookie(res, user);

  return res.json(user);
});

router.get("/me/spots", requireAuth, async (req, res) => {
  const spotsOfUser = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
  });

  return res.json({
    Spots: spotsOfUser,
  });
});

// router.get('/me', requireAuth, async (req, res) => {
//   const { user } = req;
//   return res.json(
//     // user.toSafeObject()
//     user.dataValues.token = await setTokenCookie(res, user)
//   )
// });

// GET ALL REVIEWS OF CURRENT USER
router.get("/me/reviews", requireAuth, async (req, res, next) => {
  const currentUser = req.user.id;
  const Reviews = await Review.findAll({
    where: {
      userId: currentUser,
    },
    attributes: {
      include: [
        'id',
        "userId",
        "spotId",
        "review",
        "stars",
        "createdAt",
        "updatedAt",
      ],
    },
    include: [
      {
        model: User,
        attributes: [
          'id',
          "firstName", 
          "lastName"
        ],
      },
      {
        model: Spot,
        attributes: [
          'id',
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
          "previewImage",
        ],
      },
      {
        model: ReviewImage,
        attributes: [ 'id','url' ]
    },
    ],
  });
  return res.json({Reviews});
});

module.exports = router;
