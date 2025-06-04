import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  airline: String,
  from: String,
  to: String,
  date: Date,
  time: String,
  price: Number,
  totalSeats: Number,
  availableSeats: Number
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);
export default Flight;
