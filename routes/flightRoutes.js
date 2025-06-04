import express from 'express';
import { createFlight, getFlights } from '../controllers/flightController.js';
import { protect } from '../middlewares/authMiddleware.js';




const router = express.Router();
router.post('/', protect, createFlight);
router.get('/', getFlights);

export default router;
