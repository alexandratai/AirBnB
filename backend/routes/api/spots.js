const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review } = require('../../db/models');

const { Sequelize, fn } = require('sequelize');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const review = require('../../db/models/review');
const user = require('../../db/models/user');
const { route } = require('./users');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll();
    res.json(allSpots);
});

router.post('/', requireAuth, validateSpot, async (req, res, next) => {

    const ownerId = req.user.id;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.status(201);
    return res.json(newSpot);

});

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const defaultValue = {
        ownerId: -1
    };

    // findbyPk for spot id from the params
    // check if the owner id is the same from the req.user
    // if not, throw error
    // exclude created at etc with scope

    const spot = await Spot.findByPk(req.params.spotId) || defaultValue;

    if (spot.ownerId === req.user.id) {
        const { url, preview } = req.body;
        const newImage = await SpotImage.create({
            url,
            preview,
            spotId: spot.id
        });

        delete newImage.dataValues.createdAt;
        delete newImage.dataValues.updatedAt;

        return res.json(newImage);
    } else {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

});

router.get('/:spotId', async (req, res, next) => { // ############ GET DETAILS OF SPOT BY ID

    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [
                'id',
                'ownerId',
                'address',
                'city',
                'state',
                'country',
                'lat',
                'lng',
                'name',
                'description',
                'price',
                'createdAt',
                'updatedAt',
                [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 'avgStarRating'],
                [Sequelize.fn("COUNT", Sequelize.col("Reviews.review")), 'numReviews']
            ]
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage,
                attributes: ['id', 'url']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    });

    if (spot) {
        return res.json(spot);
    } else {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }
});

router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => { // EDIT A SPOT

    const defaultValue = {
        ownerId: -1
    };

    const spot = await Spot.scope('noPreviewImage').findByPk(req.params.spotId) || defaultValue;
    const ownerId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (spot.ownerId === req.user.id) {

        if (ownerId) {
            spot.ownerId = ownerId;
        }

        if (address) {
            spot.address = address;
        }

        if (city) {
            spot.city = city;
        }

        if (state) {
            spot.state = state;
        }

        if (country) {
            spot.country = country;
        }

        if (lat) {
            spot.lat = lat;
        }

        if (lng) {
            spot.lng = lng;
        }

        if (name) {
            spot.name = name;
        }

        if (description) {
            spot.description = description;
        }

        if (price) {
            spot.price = price;
        }

        spot.save();

        return res.json(spot)
    } else {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err)
    }
});

// CREATE A REVIEW FOR A SPOT BASED ON A SPOT'S ID

router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res, next) => {
    // console.log("######", req.user)
    const userId = req.user.id;
    const currentSpot = await Spot.findByPk(req.params.spotId);
    const { review, stars } = req.body;

    if (!currentSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    };

    const existingReview = await Review.findByPk(req.params.spotId)

    if (existingReview && existingReview.userId === userId) {
        const err = new Error("User already has a review for this spot");
        err.status = 403;
        return next(err);
    };

    const newReview = await Review.create({
        userId,
        spotId: currentSpot.id,
        review,
        stars
    })

    res.status(201);
    return res.json(newReview);
});

// GET ALL REVIEWS BY A SPOTS ID

router.get('/:spotId/reviews', async (req, res, next) => {

});

module.exports = router;