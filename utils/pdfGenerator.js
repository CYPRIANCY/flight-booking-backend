import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

export const generateTicketPDFBuffer = async (booking, flight, user) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = new PassThrough();
    const chunks = [];

    doc.pipe(stream);

    doc.fontSize(24).text('Flight Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Passenger: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Flight: ${flight.flightNumber}`);
    doc.text(
      `Route: ${flight.departureAirport} → ${flight.arrivalAirport}`
    );
    doc.text(`Date: ${new Date(flight.departureTime).toLocaleDateString()}`);
    doc.text(`Seats: ${booking.seats}`);
    doc.text(`Amount Paid: $${booking.totalPrice}`);
    doc.text(`Booking ID: ${booking._id}`);

    doc.end();

    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
};
