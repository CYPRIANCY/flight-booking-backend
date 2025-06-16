import express from 'express';
import { markAsPaid } from '../controllers/paymentController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:bookingId/pay', protect, markAsPaid);

// router.put('/:id/pay', protect, markAsPaid);

export default router;
