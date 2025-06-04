import express from 'express';
import { bookFlight, cancelBooking } from '../controllers/bookingController.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/', protect, bookFlight);
router.put('/:id/cancel', protect, cancelBooking);

export default router;
