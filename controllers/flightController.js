import Flight from '../models/Flight.js';

export const createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
  const saved = await flight.save();
  res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export const getFlights = async (req, res) => {
  try {
     const flights = await Flight.find();
  res.json(flights);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export const getFlightById = async (req, res) => {
  try {
     const flight = await Flight.findById(req.params.id);
  if (!flight) return res.status(404).json({ message: 'Flight not found' });
  res.json(flight);
  } catch (error) {
     res.status(500).json({ message: err.message });
  }
};

export const updateFlight = async (req, res) => {
  try {
     const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!flight) return res.status(404).json({ message: 'Flight not found' });
  res.json(flight);
  } catch (error) {
     res.status(500).json({ message: err.message });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
  if (!flight) return res.status(404).json({ message: 'Flight not found' });
  res.json({ message: 'Flight deleted' });
  } catch (error) {
     res.status(500).json({ message: err.message });
  }
};

export const searchFlights = async (req, res) => {
  const { from, to, date, airline, minPrice, maxPrice } = req.query;

  let query = {};

  if (from) query.departureAirport = from;
  if (to) query.arrivalAirport = to;

  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    query.departureTime = { $gte: start, $lte: end };
  }

  if (airline) query.airline = airline;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const flights = await Flight.find(query).sort({ departureTime: 1 });
  res.json(flights);
};
