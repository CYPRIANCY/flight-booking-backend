import express from 'express';

import {
  createFlight,
  getFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  searchFlights
} from '../controllers/flightController.js';

import protect from '../middleware/authMiddleware.js';
import adminOnly from '../middleware/adminMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getFlights);
router.get('/search', searchFlights);
router.get('/:id', getFlightById);

// Admin routes
router.post(
  '/',
  protect,
  adminOnly,
  createFlight
);

router.put(
  '/:id',
  protect,
  adminOnly,
  updateFlight
);

router.delete(
  '/:id',
  protect,
  adminOnly,
  deleteFlight
);

export default router;
