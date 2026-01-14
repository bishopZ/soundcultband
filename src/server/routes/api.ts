import { Router } from 'express';
import { getKey } from '../controllers/api';
import { ensureAuthenticated } from '../middleware/auth';
import {
  getAllEvents,
  getUpcomingEventsPublic,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/events';

const router = Router();

// API routes - all require authentication
router.get('/api/key', ensureAuthenticated, getKey);

// Events routes
router.get('/api/events/public', getUpcomingEventsPublic);
router.get('/api/events', ensureAuthenticated, getAllEvents);
router.post('/api/events', ensureAuthenticated, createEvent);
router.put('/api/events/:id', ensureAuthenticated, updateEvent);
router.delete('/api/events/:id', ensureAuthenticated, deleteEvent);

export default router;

