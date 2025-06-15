import express from 'express';
import { getAllBookings, getStats } from '../controllers/adminController.js';
import protect from '../middleware/authMiddleware.js';
import isAdmin from '../middleware/adminMiddleware.js';

const router = express.Router();

// Only admin access
router.use(protect, isAdmin);

router.get('/bookings', getAllBookings);
router.get('/stats', getStats);

export default router;
