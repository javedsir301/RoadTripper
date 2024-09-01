const db = require("../models");

exports.createBooking = async (req, res) => {
  try {
    const { busId, seatsBooked } = req.body;
    const userId = req.userId;

    const bus = await db.Bus.findByPk(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    if (bus.seats < seatsBooked)
      return res.status(400).json({ message: "Not enough seats available" });

    const booking = await db.Booking.create({
      userId,
      busId,
      seatsBooked,
      bookingDate: new Date(),
    });

    bus.seats -= seatsBooked;
    await bus.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await db.Booking.findAll({ where: { userId } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;

    const booking = await db.Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;
    const { seatsBooked } = req.body;

    const booking = await db.Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    const bus = await db.Bus.findByPk(booking.busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    bus.seats += booking.seatsBooked - seatsBooked;
    await bus.save();

    booking.seatsBooked = seatsBooked;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.booking_id;

    const booking = await db.Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.userId !== req.userId)
      return res.status(403).json({ message: "Forbidden" });

    const bus = await db.Bus.findByPk(booking.busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    bus.seats += booking.seatsBooked;
    await bus.save();

    await booking.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
