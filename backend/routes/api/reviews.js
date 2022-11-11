const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');
const user = require('../../db/models/user');
const { route } = require('./users');

const router = express.Router();

// Add an Image to a Review based on the Review's Id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);

    const imageCount = await ReviewImage.count({
        where: {
            reviewId: req.params.reviewId
        }
    });

    const { url } = req.body;

    if (imageCount >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
    } else if (review && review.userId === req.user.id) {
        const newImage = await ReviewImage.create({
            reviewId: review.id,
            url
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

module.exports = router;