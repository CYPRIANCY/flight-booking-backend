import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, 
    ref: 'Flight', 
    required: true },
  seats: { type: Number,
     default: 1 },
  status: { type: String,
     default: 'confirmed' },
  paid: { type: Boolean,
     default: false },
  paymentDetails: {
      id: String,
      status: String,
      email_address: String,
  },
  
  // models/Booking.js

  ticketPDF: {
    data: Buffer,
    contentType: String
  }


}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
