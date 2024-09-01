const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, bookingController.createBooking);
router.get("/", authMiddleware, bookingController.getUserBookings);
router.get("/:booking_id", authMiddleware, bookingController.getBooking);
router.put("/:booking_id", authMiddleware, bookingController.updateBooking);
router.delete("/:booking_id", authMiddleware, bookingController.cancelBooking);

module.exports = router;
