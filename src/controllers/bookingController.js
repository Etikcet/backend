const express = require("express");

const authenticateToken = require("../helpers/authorization");

const router = express.Router();

const bookingService = require("../services/bookingService");

router.get(
  "/update/:ID",
  (req, res, next) => authenticateToken(req, res, next, "CUSTOMER"),
  async (req, res) => {
    try {
      await bookingService.updateBookingStatus(req.params.ID);
      res.status(201);
      res.send({
        message: "Booking status updated succesfully",
        statusCode: 201,
      });
    } catch (error) {
      res.status(400);
      res.send({
        message: error.message,
        statusCode: 400,
      });
    }
  }
);

router.get(
  "/mybookings",
  (req, res, next) => authenticateToken(req, res, next, "ALL"),
  async (req, res) => {
    try {
      const data = await bookingService.getBookingForUser(req.user.ID);
      res.status(200);
      res.send({
        bookings: data,
        statusCode: 200,
      });
    } catch (error) {
      res.status(400);
      res.send({
        statusCode: 400,
        message: error.message,
      });
    }
  }
);

router.post("/search", async (req, res) => {
  try {
    const data = await bookingService.searchBookingAvailability(req.body);
    res.status(200);
    res.send({
      availableRoutes: data,
      statusCode: 200,
    });
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const response = await bookingService.addBooking(req.body);
    res.status(201);
    res.send({
      data: {
        booking: {
          ...response,
        },
        statusCode: 201,
        message: "Booking added succesfully",
      },
    });
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

module.exports = router;
