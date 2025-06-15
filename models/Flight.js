import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true, unique: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seatsAvailable: { type: Number, default: 60 },
  price: { type: Number, required: true },
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
export default Flight;
