import express from 'express';
import { downloadTicketFromDB } from '../controllers/ticketController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/download/:bookingId', protect, downloadTicketFromDB);

export default router;
