import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

export const generateTicketPDFBuffer = async (
  booking,
  flight,
  user
) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 50
    });

    const stream = new PassThrough();
    const chunks = [];

    doc.pipe(stream);

    doc
      .fontSize(24)
      .text('CYPIDON FLIGHT BOOKING', {
        align: 'center'
      });

    doc.moveDown();

    doc
      .fontSize(20)
      .text('Electronic Flight Ticket', {
        align: 'center'
      });

    doc.moveDown(2);

    doc.fontSize(14);

    doc.text(`Passenger: ${user.name}`);
    doc.text(`Email: ${user.email}`);

    doc.moveDown();

    doc.text(`Flight Number: ${flight.flightNumber}`);
    doc.text(`Airline: ${flight.airline}`);

    doc.moveDown();

    doc.text(
      `From: ${flight.departureAirport}`
    );

    doc.text(
      `To: ${flight.arrivalAirport}`
    );

    doc.moveDown();

    doc.text(
      `Departure: ${new Date(
        flight.departureTime
      ).toLocaleString()}`
    );

    doc.text(
      `Arrival: ${new Date(
        flight.arrivalTime
      ).toLocaleString()}`
    );

    doc.moveDown();

    doc.text(`Seats: ${booking.seats}`);

    doc.text(
      `Amount Paid: $${booking.totalPrice}`
    );

    doc.text(
      `Booking ID: ${booking._id}`
    );

    doc.moveDown(2);

    doc
      .fontSize(12)
      .text(
        'Thank you for choosing CYPIDON Flight Booking System.',
        {
          align: 'center'
        }
      );

    doc.end();

    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    stream.on('error', reject);
  });
};
