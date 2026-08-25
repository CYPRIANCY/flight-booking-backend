import Booking from '../models/Booking.js';
import Flight from '../models/Flight.js';
import User from '../models/User.js';

export const getAllBookings = async (req, res) => {
  try {
    const {
      flight,
      user,
      date
    } = req.query;

    const filter = {};

    if (flight) {
      filter.flight = flight;
    }

    if (user) {
      filter.user = user;
    }

    if (date) {
      const start = new Date(date);
      const end = new Date(date);

      end.setHours(23, 59, 59, 999);

      filter.createdAt = {
        $gte: start,
        $lte: end
      };
    }

    const bookings = await Booking.find(filter)
      .populate('user', 'name email')
      .populate('flight');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalBookings =
      await Booking.countDocuments();

    const totalFlights =
      await Flight.countDocuments();

    const totalUsers = 0;

    const revenueResult =
      await Booking.aggregate([
        {
          $match: {
            paid: true,
            status: {
              $ne: 'cancelled'
            }
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: '$totalPrice'
            }
          }
        }
      ]);

    const revenue =
      revenueResult[0]?.total || 0;

    res.json({
      totalBookings,
      totalFlights,
      totalUsers,
      totalRevenue: revenue
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
