import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Go up from src/server/services to workspace root, then into volume
// __dirname is src/server/services, so we need to go up 3 levels
const EVENTS_FILE_PATH = path.join(__dirname, '../../../volume/events.json');
const EVENTS_DIR = path.dirname(EVENTS_FILE_PATH);

// eslint-disable-next-line no-console
console.log('Events file path:', EVENTS_FILE_PATH);
// eslint-disable-next-line no-console
console.log('Events dir path:', EVENTS_DIR);
// eslint-disable-next-line no-console
console.log('__dirname:', __dirname);

export interface Event {
  id: string;
  venue: string;
  date: string; // YYYY-MM-DD format
  time: string; // HH:mm format
  description: string;
}

export const getEventsFile = () => EVENTS_FILE_PATH;

export const ensureEventsFile = () => {
  try {
    // eslint-disable-next-line no-console
    console.log('ensureEventsFile called');
    // eslint-disable-next-line no-console
    console.log('Checking if directory exists:', EVENTS_DIR, 'exists:', existsSync(EVENTS_DIR));
    // Ensure the volume directory exists
    if (!existsSync(EVENTS_DIR)) {
      // eslint-disable-next-line no-console
      console.log('Creating directory:', EVENTS_DIR);
      mkdirSync(EVENTS_DIR, { recursive: true });
    }
    // eslint-disable-next-line no-console
    console.log('Checking if file exists:', EVENTS_FILE_PATH, 'exists:', existsSync(EVENTS_FILE_PATH));
    // Create the events file if it doesn't exist
    if (!existsSync(EVENTS_FILE_PATH)) {
      // eslint-disable-next-line no-console
      console.log('Creating events file:', EVENTS_FILE_PATH);
      writeFileSync(EVENTS_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
      // eslint-disable-next-line no-console
      console.log('Events file created successfully');
    } else {
      // eslint-disable-next-line no-console
      console.log('Events file already exists');
    }
  } catch (error) {
    console.error('Error ensuring events file:', error);
    throw error;
  }
};

export const readEvents = (): Event[] => {
  try {
    // eslint-disable-next-line no-console
    console.log('readEvents called, checking file:', EVENTS_FILE_PATH);
    if (!existsSync(EVENTS_FILE_PATH)) {
      // eslint-disable-next-line no-console
      console.log('Events file does not exist, returning empty array');
      return [];
    }
    const fileContent = readFileSync(EVENTS_FILE_PATH, 'utf-8');
    // eslint-disable-next-line no-console
    console.log('File content read, length:', fileContent.length);
    const parsed = JSON.parse(fileContent) as Event[];
    // eslint-disable-next-line no-console
    console.log('Parsed events count:', parsed.length);
    return parsed;
  } catch (error) {
    console.error('Error reading events file:', error);
    return [];
  }
};

export const writeEvents = (events: Event[]) => {
  try {
    writeFileSync(EVENTS_FILE_PATH, JSON.stringify(events, null, 2), 'utf-8');
  } catch (error) {

    console.error('Error writing events file:', error);
    throw error;
  }
};

export const getUpcomingEvents = (): Event[] => {
  const events = readEvents();
  const now = new Date();

  return events
    .filter(event => {
      const eventDateTime = new Date(`${event.date}T${event.time}`);
      return eventDateTime > now;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
};
