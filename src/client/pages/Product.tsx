import { useState, useEffect } from 'react';
import { Box, Button, Container, Heading, Link, Text, VStack, HStack } from '@chakra-ui/react';
import EventForm from '../components/ui/EventForm';
import { Footer } from '../components/layout/footer';
import { PrivateHeader } from '../components/layout/header';
import { COLORS } from '../shared/constants';

interface FormData {
  venue: string;
  venueLink?: string;
  date: string;
  time: string;
  description: string;
}

type Event = FormData & {
  id: string;
}


/* eslint-disable-next-line max-lines-per-function */
const Product = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const resetForm = () => {
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleAddClick = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDeleteClick = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      return;
    }

    try {
      setError(null);
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setError(null);
      const url = editingEvent ? `/api/events/${editingEvent.id}` : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';

      const payload = {
        venue: formData.venue,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        ...(formData.venueLink != null && formData.venueLink !== '' ? { venueLink: formData.venueLink } : {}),
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? 'Failed to save event');
      }

      resetForm();
      fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <>
      <PrivateHeader />
      <Container maxW="container.lg" py={8}>
        <VStack gap={6} align="stretch">
          <Box>
            <HStack justify="space-between" align="center" mb={4}>
              <Heading as="h1" size="2xl" color={COLORS.TEXT}>
                Events Management
              </Heading>
              <Button colorScheme="blue" onClick={handleAddClick} disabled={showForm}>
                Add Event
              </Button>
            </HStack>
          </Box>

          {error && (
            <Box bg="red.500" color={COLORS.TEXT} p={4} borderRadius="md">
              {error}
            </Box>
          )}

          {showForm && (
            <EventForm
              key={editingEvent?.id ?? 'new'}
              initialData={editingEvent ?? undefined}
              onSubmit={(data: FormData) => { void handleFormSubmit(data); }}
              onCancel={resetForm}
            />
          )}

          {loading && <Text color="gray.200">Loading events...</Text>}
          {!loading && events.length === 0 && <Text color="gray.200">No events found. Add your first event above.</Text>}
          {!loading && events.length > 0 && (
            <VStack gap={4} align="stretch">
              {events.map(event => (
                <Box
                  key={event.id}
                  bg="gray.800"
                  p={4}
                  borderRadius="md"
                  border="1px"
                  borderColor="gray.700"
                >
                  <VStack align="stretch" gap={2}>
                    <HStack justify="space-between" align="start">
                      <VStack align="start" gap={1} flex={1}>
                        <Heading as="h3" size="md" color={COLORS.TEXT}>
                          {event.venueLink ? (
                            <Link href={event.venueLink} color="inherit" textDecoration="underline">
                              {event.venue}
                            </Link>
                          ) : (
                            event.venue
                          )}
                        </Heading>
                        <Text color="gray.300" fontSize="sm">
                          {formatDateTime(event.date, event.time)}
                        </Text>
                        <Text color="gray.200" mt={2}>
                          {event.description}
                        </Text>
                      </VStack>
                      <HStack gap={2}>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          variant="solid"
                          onClick={() => { handleEditClick(event); }}
                          disabled={showForm}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          variant="solid"
                          onClick={() => { handleDeleteClick(event.id); }}
                          disabled={showForm}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </VStack>
          )}
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Product;
