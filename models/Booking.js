import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Flight',
      required: true
    },

    seats: {
      type: Number,
      required: true,
      min: 1
    },

    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ['confirmed', 'cancelled'],
      default: 'confirmed'
    },

    paid: {
      type: Boolean,
      default: false
    },

    paymentDetails: {
      id: String,
      status: String,
      email_address: String,
      update_time: Date
    },

    ticketPDF: {
      data: Buffer,
      contentType: String
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
