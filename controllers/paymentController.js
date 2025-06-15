import Booking from '../models/Booking.js';
import { generateTicketPDF } from '../utils/pdfGenerator.js';
import { sendEmail } from '../utils/emailService.js';
import path from 'path';
import fs from 'fs';

// @desc   Mark booking as paid
// @route  POST /api/payment/:bookingId/pay
// @access Private
export const markAsPaid = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('flight')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not your booking' });
  }

    booking.paid = true;
    booking.paymentResult = {
      id: req.body.id || 'PAYID123456',
      status: req.body.status || 'COMPLETED',
      update_time: new Date(),
      email_address: req.user.email
    };

    await booking.save();

    // Generate PDF ticket
    const filePath = generateTicketPDF(booking, booking.flight, booking.user);

    // Send Email with PDF ticket
    const emailHTML = `
      <h2>Booking Confirmed!</h2>
      <p>Your booking for flight <strong>${booking.flight.flightNumber}</strong> has been confirmed.</p>
      <p>PDF Ticket attached below.</p>
    `;

    await sendEmail(
      booking.user.email,
      'Your Flight Ticket Confirmation',
      emailHTML,
      filePath
    );

    res.json({ message: 'Payment confirmed and ticket sent', booking });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
