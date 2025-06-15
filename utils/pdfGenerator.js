import fs from 'fs';
import PDFDocument from 'pdfkit';
import path from 'path';

export const generateTicketPDF = (booking, flight, user) => {
  const doc = new PDFDocument();
  const filePath = path.join('tickets', `ticket-${booking._id}.pdf`);
  
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(24).text('Flight Ticket', { align: 'center' });
  doc.moveDown();

  doc.fontSize(14).text(`Passenger: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.text(`Flight Number: ${flight.flightNumber}`);
  doc.text(`From: ${flight.from}  →  To: ${flight.to}`);
  doc.text(`Date: ${new Date(flight.departureTime).toLocaleDateString()}`);
  doc.text(`Seat(s): ${booking.seatsBooked}`);
  doc.text(`Total Paid: $${booking.totalPrice}`);
  doc.text(`Booking ID: ${booking._id}`);
  doc.end();

  return filePath;
};
