// import path from 'path';
// import fs from 'fs';
import Booking from '../models/Booking.js';

// // @desc   Download PDF Ticket
// // @route  GET /api/tickets/download/:bookingId
// // @access Private
// export const downloadTicket = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     const filePath = path.join('tickets', `ticket-${booking._id}.pdf`);

//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: 'Ticket not generated yet' });
//     }

//     res.download(filePath, `Flight-Ticket-${booking._id}.pdf`);
//   } catch (error) {
//     console.error('Download error:', error);
//     res.status(500).json({ message: 'Server error downloading ticket' });
//   }
// };

// From DB
export const downloadTicketFromDB = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking || !booking.ticketPDF?.data) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.set({
      'Content-Type': booking.ticketPDF.contentType,
      'Content-Disposition': `attachment; filename=ticket-${booking._id}.pdf`
    });

    res.send(booking.ticketPDF.data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving ticket' });
  }
};
