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

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const booking = await Booking.findByPk(req.params.bookingId);
  const { startDate, endDate } = req.body;

  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  let today = new Date();

  
  // Couldn't find a Booking with the specified id #####
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  }
  
  // Can't edit a booking that's past the end date
  if (booking && (today > booking.endDate)) {
    const err = new Error("Past bookings can't be modified");
    err.status = 403;
    return next(err);
  }

  // Booking conflict
  if (
    booking &&
    (booking.dataValues.startDate.valueOf() === startDateObj.valueOf() ||
      booking.dataValues.endDate.valueOf() === endDateObj.valueOf())
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

  if (startDateObj > endDateObj) {
    const err = new Error("Validation error");
    err.title = "Validation error";
    err.status = 400;
    err.errors = {
      endDate: "endDate cannot come before startDate",
    };
    return next(err);
  }

  if (booking.userId === userId) {
    if (startDate) {
      booking.startDate = startDate;
    }

    if (endDate) {
      booking.endDate = endDate;
    }

    booking.save();
    return res.json(booking);
  }
});

router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const currentUser = req.user.id;
  const doomedBooking = await Booking.findByPk(req.params.bookingId);
  
  if (!doomedBooking) {
    const err = new Error("Booking couldn't be found");
    err.status = 404;
    return next(err);
  };

  const spot = await Spot.findOne({
    where: {
      id: doomedBooking.spotId,
    },
  });

  const today = new Date();
  
  
  // Bookings that have been started can't be deleted
  // Check if the current date is > start date ^
  if (doomedBooking && (today > doomedBooking.startDate)) {
    const err = new Error("Bookings that have been started can't be deleted");
    err.status = 403;
    return next(err);
  }

  
  if (doomedBooking && (doomedBooking.userId === currentUser || spot.ownerId === currentUser)) {
    await doomedBooking.destroy();
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
  // If the booking isn't owned by the current user, make another error.
  if (doomedBooking && (doomedBooking.userId !== currentUser || spot.ownerId !== currentUser)) {
    const err = new Error("You do not own this booking or spot");
    err.status = 403;
    return next(err);
  };

});

module.exports = router;
