import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// View all bookings with optional filters
export const getAllBookings = async (req, res) => {
  const { flight, user, date } = req.query;
  let filter = {};

  if (flight) filter.flight = flight;
  if (user) filter.user = user;
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    filter.createdAt = { $gte: start, $lte: end };
  }

  const bookings = await Booking.find(filter)
    .populate('user', 'name email')
    .populate('flight');

  res.json(bookings);
};

// Get stats (totals & revenue)
export const getStats = async (req, res) => {
  const totalBookings = await Booking.countDocuments();
  const totalFlights = await Flight.countDocuments();

  const revenueResult = await Booking.aggregate([
    { $match: { paid: true } },
    { $group: { _id: null, total: { $sum: "$totalPrice" } } }
  ]);

  const revenue = revenueResult[0]?.total || 0;

  res.json({
    totalBookings,
    totalFlights,
    totalRevenue: revenue
  });
};
