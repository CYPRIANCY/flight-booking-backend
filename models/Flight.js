import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: true,
      trim: true
    },

    flightNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    departureAirport: {
      type: String,
      required: true,
      trim: true
    },

    arrivalAirport: {
      type: String,
      required: true,
      trim: true
    },

    departureTime: {
      type: Date,
      required: true
    },

    arrivalTime: {
      type: Date,
      required: true
    },

    seatsAvailable: {
      type: Number,
      default: 60,
      min: 0
    },

    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

const Flight = mongoose.model(
  'Flight',
  flightSchema
);

export default Flight;
