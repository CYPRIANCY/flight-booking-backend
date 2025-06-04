import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';

export const bookFlight = async (req, res) => {
  const { flightId, seatCount } = req.body;

  const flight = await Flight.findById(flightId);
  if (flight.availableSeats < seatCount)
    return res.status(400).json({ message: 'Not enough seats' });

  const booking = await Booking.create({
    user: req.user._id,
    flight: flightId,
    seatCount
  });

  flight.availableSeats -= seatCount;
  await flight.save();

  res.status(201).json(booking);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('flight');
  if (!booking || booking.user.toString() !== req.user._id.toString())
    return res.status(404).json({ message: 'Not found' });

  booking.status = 'Cancelled';
  await booking.save();

  booking.flight.availableSeats += booking.seatCount;
  await booking.flight.save();

  res.json({ message: 'Booking cancelled' });
};
