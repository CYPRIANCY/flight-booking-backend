import express from 'express';
import {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  searchFlights,
} from '../controllers/flightController.js';
import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, adminOnly, createFlight)
  .get(getFlights);
  router.get('/search', searchFlights); // Public search route

router.route('/:id')
  .get(getFlightById)
  .put(protect, adminOnly, updateFlight)
  .delete(protect, adminOnly, deleteFlight);

export default router;
