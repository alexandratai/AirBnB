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

// EDIT A BOOKING ########

router.put('/:bookingId', requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const booking = await Booking.findByPk(req.params.bookingId);
  const { startDate, endDate } = req.body;

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  if (startDateObj > endDateObj) {
    const err = new Error("Validation error");
    err.title = "Validation error";
    err.status = 400;
    err.errors = {
        "endDate": "endDate cannot come before startDate"
    };
    return next(err)
};

  if (booking.userId === userId) {
    if (startDate) {
      booking.startDate = startDate;
    };

    if (endDate) {
      booking.endDate = endDate;
    }

    booking.save();
    return res.json(booking)
  }

  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }


});

module.exports = router;