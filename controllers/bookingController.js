import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import { sendEmail } from '../utils/emailService.js';

export const createBooking = async (req, res) => {
  try {
    const { flightId, seats } = req.body;

    if (!flightId || !seats) {
      return res.status(400).json({
        message: 'Flight ID and number of seats are required'
      });
    }

    if (seats < 1) {
      return res.status(400).json({
        message: 'Seats must be at least 1'
      });
    }

    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({
        message: 'Flight not found'
      });
    }

    if (flight.seatsAvailable < seats) {
      return res.status(400).json({
        message: 'Not enough seats available'
      });
    }

    const totalPrice = flight.price * seats;

    const booking = await Booking.create({
      user: req.user._id,
      flight: flight._id,
      seats,
      totalPrice
    });

    flight.seatsAvailable -= seats;

    await flight.save();

    await sendEmail(
      req.user.email,
      'Booking Confirmation',
      `
        <h2>Booking Confirmed!</h2>
        <p>Your booking has been successfully created.</p>
        <p><strong>Flight:</strong> ${flight.flightNumber}</p>
        <p><strong>Seats:</strong> ${seats}</p>
        <p><strong>Total:</strong> $${totalPrice}</p>
      `
    );

    res.status(201).json(booking);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('flight');
  res.json(bookings);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('flight');

  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  // Only the owner can cancel
  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to cancel this booking' });
  }

  if (booking.status === 'cancelled') {
    return res.status(400).json({ message: 'Booking already cancelled' });
  }

  // Restore seat count
  booking.flight.seatsAvailable += booking.seats;
  await booking.flight.save();

  booking.status = 'cancelled';
  await booking.save();

   // sending Email after Booking cancelled
  await sendEmail(
    req.user.email,
    'Booking Cancelled',
    `<h2>Booking Cancelled</h2>
    <p>Your booking for flight ${booking.flight.flightNumber} has been cancelled.</p>`
  );


  res.json({ message: 'Booking cancelled', booking });
};
