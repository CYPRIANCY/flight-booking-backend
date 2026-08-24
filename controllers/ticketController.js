import Booking from '../models/Booking.js';

export const downloadTicketFromDB = async (req, res) => {
  try {
    const booking = await Booking.findById(
      req.params.bookingId
    );

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    // Only booking owner can download ticket
    if (
      booking.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: 'You are not authorized to download this ticket'
      });
    }

    if (!booking.ticketPDF?.data) {
      return res.status(404).json({
        message: 'Ticket not found. Complete payment first.'
      });
    }

    res.set({
      'Content-Type':
        booking.ticketPDF.contentType ||
        'application/pdf',

      'Content-Disposition':
        `attachment; filename="ticket-${booking._id}.pdf"`
    });

    res.send(booking.ticketPDF.data);

  } catch (error) {
    console.error('Download error:', error);

    res.status(500).json({
      message: 'Error retrieving ticket'
    });
  }
};
