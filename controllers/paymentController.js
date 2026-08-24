import Booking from '../models/Booking.js';

import { sendEmail } from '../utils/emailService.js';

import { generateTicketPDFBuffer } from '../utils/pdfGenerator.js';

export const markAsPaid = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate('flight')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not your booking' });
  }

    booking.paid = true;
    booking.paymentDetails = {
      id: 'PAYID123456',
      status: 'COMPLETED',
      update_time: new Date(),
      email_address: req.user.email
    };

    const pdfBuffer = await generateTicketPDFBuffer(booking, booking.flight, booking.user);

    // Save to booking
    booking.ticketPDF = {
      data: pdfBuffer,
      contentType: 'application/pdf'
    };

    await booking.save();

    // Email the buffer as attachment
    await sendEmail(
      booking.user.email,
      'Your Flight Ticket',
      '<h2>Thank you for booking!</h2><p>Your ticket is attached.</p>',
      { filename: `ticket-${booking._id}.pdf`, content: pdfBuffer, contentType: 'application/pdf' }
    );

    res.json({ message: 'Payment confirmed and ticket sent', booking });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
