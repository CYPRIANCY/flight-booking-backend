import Flight from '../models/Flight.js';

export const createFlight = async (req, res) => {
    try {
        const flight = new Flight(req.body);
        await flight.save();
        res.status(201).json(flight);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
