import type { RequestHandler } from 'express';
import { readEvents, writeEvents, getUpcomingEvents, type Event } from '../services/events';
import { randomUUID } from 'crypto';

// Get all events (admin only)
export const getAllEvents: RequestHandler = (_, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log('getAllEvents called');
    const events = readEvents();
    // eslint-disable-next-line no-console
    console.log('Returning events:', events);
    res.json(events);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in getAllEvents:', error);
    res.status(500).json({ error: 'Failed to read events' });
  }
};

// Get upcoming events (public)
export const getUpcomingEventsPublic: RequestHandler = (_, res) => {
  try {
    const events = getUpcomingEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read events' });
  }
};

// Create new event (admin only)
export const createEvent: RequestHandler = (req, res) => {
  try {
    const { venue, date, time, description } = req.body;

    if (!venue || !date || !time || !description) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
      return;
    }

    // Validate time format (HH:mm)
    if (!/^\d{2}:\d{2}$/.test(time)) {
      res.status(400).json({ error: 'Invalid time format. Use HH:mm' });
      return;
    }

    const events = readEvents();
    const newEvent: Event = {
      id: randomUUID(),
      venue: venue.trim(),
      date,
      time,
      description: description.trim(),
    };

    events.push(newEvent);
    writeEvents(events);

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Update event (admin only)
export const updateEvent: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;
    const { venue, date, time, description } = req.body;

    if (!venue || !date || !time || !description) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
      return;
    }

    // Validate time format (HH:mm)
    if (!/^\d{2}:\d{2}$/.test(time)) {
      res.status(400).json({ error: 'Invalid time format. Use HH:mm' });
      return;
    }

    const events = readEvents();
    const eventIndex = events.findIndex(event => event.id === id);

    if (eventIndex === -1) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    events[eventIndex] = {
      id,
      venue: venue.trim(),
      date,
      time,
      description: description.trim(),
    };

    writeEvents(events);

    res.json(events[eventIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete event (admin only)
export const deleteEvent: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    const events = readEvents();
    const filteredEvents = events.filter(event => event.id !== id);

    if (filteredEvents.length === events.length) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    writeEvents(filteredEvents);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
