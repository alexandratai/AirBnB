const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const {
  Spot,
  SpotImage,
  User,
  Review,
  ReviewImage,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const review = require("../../db/models/review");
const user = require("../../db/models/user");
const { route } = require("./users");

const router = express.Router();

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

// Add an Image to a Review based on the Review's Id
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);

  const imageCount = await ReviewImage.count({
    where: {
      reviewId: req.params.reviewId,
    },
  });

  const { url } = req.body;

  if (imageCount >= 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.status = 403;
    return next(err);
  } else if (review && review.userId === req.user.id) {
    const newImage = await ReviewImage.create({
      reviewId: review.id,
      url,
    });

    delete newImage.dataValues.reviewId;
    delete newImage.dataValues.createdAt;
    delete newImage.dataValues.updatedAt;

    return res.json(newImage);
  } else if (!review) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }
});

// EDIT A REVIEW
router.put(
  "/:reviewId",
  requireAuth,
  validateReviews,
  async (req, res, next) => {
    const currentUser = req.user.id;
    let currentReview = await Review.findByPk(req.params.reviewId);
    const { userId, spotId, review, stars } = req.body;

    if (!currentReview) {
      const err = new Error("Review couldn't be found");
      err.status = 404;
      return next(err);
    }

    if (currentReview.userId === currentUser) {
      if (userId) {
        currentReview.userId = currentUser;
      }

      if (spotId) {
        currentReview.spotId = spotId;
      }

      if (review) {
        currentReview.review = review;
      }

      if (stars) {
        currentReview.stars = stars;
      }
    }

    currentReview.save();

    return res.json(currentReview);
  }
);

// DELETE A REVIEW IMAGE

router.delete(
  "/:reviewId/images/:imageId",
  requireAuth,
  async (req, res, next) => {
    const currentUser = req.user.id;
    const review = await Review.findByPk(req.params.reviewId);
    const { reviewId, imageId } = req.params;
    const doomedImage = await ReviewImage.findByPk(imageId);

    if (!doomedImage) {
      const err = new Error("Review Image couldn't be found");
      err.status = 404;
      return next(err);
    }

    if (review.userId === currentUser) {
      await doomedImage.destroy();
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
);

// DELETE A REVIEW

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const currentUser = req.user.id;
  const doomedReview = await Review.findByPk(req.params.reviewId);

  if (!doomedReview) {
    const err = new Error("Review couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (doomedReview.userId === currentUser) {
    await doomedReview.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

module.exports = router;
