import Booking from '../models/Booking.js';

export const payForBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not your booking' });
  }

  booking.paid = true;
  booking.paymentDetails = {
    id: req.body.id,
    status: req.body.status,
    email_address: req.body.email_address,
  };

  await booking.save();

  res.json({ message: 'Payment successful', booking });
};
