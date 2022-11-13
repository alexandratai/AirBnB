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
  Booking,
} = require("../../db/models");

const { Sequelize, fn, Op } = require("sequelize");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const review = require("../../db/models/review");
const user = require("../../db/models/user");
const { route } = require("./users");

const router = express.Router();

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

// router.get("/", async (req, res) => {
//   const allSpots = await Spot.findAll();
//   res.json(allSpots);
// });

router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const ownerId = req.user.id;

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

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
    price,
  });

  res.status(201);
  return res.json(newSpot);
});

router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const defaultValue = {
    ownerId: -1,
  };

  // findbyPk for spot id from the params
  // check if the owner id is the same from the req.user
  // if not, throw error
  // exclude created at etc with scope

  const spot = (await Spot.findByPk(req.params.spotId)) || defaultValue;

  if (spot.ownerId === req.user.id) {
    const { url, preview } = req.body;
    const newImage = await SpotImage.create({
      url,
      preview,
      spotId: spot.id,
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

router.get("/:spotId", async (req, res, next) => {
  // ############ GET DETAILS OF SPOT BY ID

  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
        [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgStarRating"],
        [Sequelize.fn("COUNT", Sequelize.col("Reviews.review")), "numReviews"],
      ],
    },
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
        attributes: ["id", "url"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"]
      },
    ],

    group: "Spots.id",
    // require: "true",
    // duplicating: "false",
    subQuery: false,
  });

  if (spot) {
    return res.json(spot);
  } else {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
});

router.put("/:spotId", requireAuth, validateSpot, async (req, res, next) => {
  // EDIT A SPOT

  const defaultValue = {
    ownerId: -1,
  };

  const spot =
    (await Spot.scope("noPreviewImage").findByPk(req.params.spotId)) ||
    defaultValue;
  const ownerId = req.user.id;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

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

    return res.json(spot);
  } else {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
});

// CREATE A REVIEW FOR A SPOT BASED ON A SPOT'S ID

router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReview,
  async (req, res, next) => {
    const userId = req.user.id;
    const currentSpot = await Spot.findByPk(req.params.spotId);
    const { review, stars } = req.body;

    if (!currentSpot) {
      const err = new Error("Spot couldn't be found");
      err.status = 404;
      return next(err);
    }

    const existingReview = await Review.findByPk(req.params.spotId);

    if (existingReview && existingReview.userId === userId) {
      const err = new Error("User already has a review for this spot");
      err.status = 403;
      return next(err);
    }

    const newReview = await Review.create({
      userId,
      spotId: currentSpot.id,
      review,
      stars,
    });

    res.status(201);
    return res.json(newReview);
  }
);

// GET ALL REVIEWS BY A SPOTS ID

router.get("/:spotId/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  const Reviews = await Review.findAll({
    where: {
      spotId: req.params.spotId,
    },
    attributes: {
      include: [
        "id",
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
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  return res.json({ Reviews });
});

// CREATE A BOOKING BASED ON SPOT ID #############

router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const currentUser = req.user.id;
  const spot = await Spot.findByPk(req.params.spotId);

  const { startDate, endDate } = req.body;
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  const currentBookings = await Booking.findOne({
    where: {
      [Op.or]: [
        { startDate: { [Op.between]: [startDateObj, endDateObj] } },
        { endDate: { [Op.between]: [startDateObj, endDateObj] } },
      ],
    },
  });

  console.log("CURRENT BOOKINGS", currentBookings);

  if (spot === null) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (spot.ownerid === currentUser) {
    const err = new Error(
      "Sorry, you cannot book this spot because you own this spot"
    );
    err.status = 403;
    return next(err);
  }

  if (startDateObj >= endDateObj) {
    const err = new Error("Validation error");
    err.title = "Validation error";
    err.status = 400;
    err.errors = {
      endDate: "endDate cannot be on or before startDate",
    };
    return next(err);
  }

  if (!currentBookings && spot.ownerId !== currentUser) {
    const newBooking = await Booking.create({
      spotId: req.params.spotId,
      userId: currentUser,
      startDate,
      endDate,
    });
    return res.json(newBooking);
  }

  if (
    currentBookings &&
    (currentBookings.dataValues.startDate.valueOf() ===
      startDateObj.valueOf() ||
      currentBookings.dataValues.endDate.valueOf() === endDateObj.valueOf())
  ) {
    const err = new Error(
      "Sorry, this spot is already booked for the specified dates"
    );
    err.status = 403;
    err.errors = {
      startDate: "Start date conflicts with an existing booking",
      endDate: "End date conflicts with an existing booking",
    };

    return next(err);
  }
});

// GET ALL BOOKINGS FOR A SPOT BASED ON SPOT ID #########

router.get("/:spotId/bookings", requireAuth, async (req, res, next) => {
  const currentUser = req.user.id;
  const currentSpot = await Spot.findByPk(req.params.spotId);

  if (currentSpot && currentSpot.ownerId === currentUser) {
    const yourSpotBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      attributes: {
        include: ["id", "spotId", "userId", "startDate", "endDate"],
      },
      include: [
        {
          model: User,
          attributes: {
            include: ["firstName", "lastName"],
            exclude: [
              "username",
              "email",
              "hashedPassword",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
    });

    return res.json({ Bookings: yourSpotBookings });
  }

  if (currentSpot && currentSpot.ownerId !== currentUser) {
    const notYourSpotBookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId,
      },
      attributes: {
        include: ["spotId", "startDate", "endDate"],
        exclude: ["id", "userId", "createdAt", "updatedAt"],
      },
    });
    return res.json({ Bookings: notYourSpotBookings });
  }

  if (!currentSpot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }
});

// DELETE A SPOT IMAGE

router.delete(
  "/:spotId/images/:imageId",
  requireAuth,
  async (req, res, next) => {
    const currentUser = req.user.id;
    const spot = await Spot.findByPk(req.params.spotId);
    const { spotId, imageId } = req.params;
    const doomedImage = await SpotImage.findByPk(imageId);

    if (!doomedImage) {
      const err = new Error("Spot Image couldn't be found");
      err.status = 404;
      return next(err);
    }

    if (spot.ownerId === currentUser) {
      await doomedImage.destroy();
      return res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    }
  }
);

// DELETE A SPOT

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const currentUser = req.user.id;
  const doomedSpot = await Spot.findByPk(req.params.spotId);

  if (!doomedSpot) {
    const err = new Error("Spot couldn't be found");
    err.status = 404;
    return next(err);
  }

  if (doomedSpot.ownerId === currentUser) {
    await doomedSpot.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

// ADD QUERY FILTERS TO GET ALL SPOTS

router.get("/", validateQueryParameters, async (req, res, next) => {
  let page = req.query.page || 0;
  let size = req.query.size || 20;

  page = parseInt(page);
  size = parseInt(size);

  // console.log("#####", page)
  const pagination = {};

  if (page > 0 && page <= 10 && size >= 0 && size <= 20) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  }

  const spots = await Spot.findAll({
    attributes: [
      "id",
      "ownerId",
      "address",
      "city",
      "state",
      "country",
      "lat",
      "lng",
      "name",
      "description",
      "price",
      "createdAt",
      "updatedAt",
      "previewImage",
    ],
    ...pagination,
  });

  return res.json({ Spots: spots, page, size });
});

module.exports = router;
