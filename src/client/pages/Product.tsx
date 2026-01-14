import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Footer } from '../components/layout/footer';
import { PrivateHeader } from '../components/layout/header';

interface Event {
  id: string;
  venue: string;
  date: string;
  time: string;
  description: string;
}

/* eslint-disable-next-line max-lines-per-function */
const Product = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    venue: '',
    date: '',
    time: '',
    description: '',
  });
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
    setFormData({
      venue: '',
      date: '',
      time: '',
      description: '',
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  const handleAddClick = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      venue: event.venue,
      date: event.date,
      time: event.time,
      description: event.description,
    });
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

  const handleSubmit = async () => {
    try {
      setError(null);
      const url = editingEvent ? `/api/events/${editingEvent.id}` : '/api/events';
      const method = editingEvent ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
              <Heading as="h1" size="2xl" color="white">
                Events Management
              </Heading>
              <Button colorScheme="blue" onClick={handleAddClick} disabled={showForm}>
                Add Event
              </Button>
            </HStack>
          </Box>

          {error && (
            <Box bg="red.500" color="white" p={4} borderRadius="md">
              {error}
            </Box>
          )}

          {showForm && (
            <Box bg="gray.800" p={6} borderRadius="md" border="1px" borderColor="gray.700">
              <VStack gap={4} align="stretch">
                <Heading as="h2" size="lg" color="white">
                  {editingEvent ? 'Edit Event' : 'Add Event'}
                </Heading>

                <Box>
                  <Text mb={2} color="white" fontWeight="medium">
                    Venue *
                  </Text>
                  <Input
                    value={formData.venue}
                    onChange={event => { setFormData({ ...formData, venue: event.target.value }); }}
                    placeholder="Enter venue name"
                    bg="gray.700"
                    color="white"
                    borderColor="gray.600"
                  />
                </Box>

                <Box>
                  <Text mb={2} color="white" fontWeight="medium">
                    Date *
                  </Text>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={event => { setFormData({ ...formData, date: event.target.value }); }}
                    bg="gray.700"
                    color="white"
                    borderColor="gray.600"
                  />
                </Box>

                <Box>
                  <Text mb={2} color="white" fontWeight="medium">
                    Time *
                  </Text>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={event => { setFormData({ ...formData, time: event.target.value }); }}
                    bg="gray.700"
                    color="white"
                    borderColor="gray.600"
                  />
                </Box>

                <Box>
                  <Text mb={2} color="white" fontWeight="medium">
                    Description *
                  </Text>
                  <Textarea
                    value={formData.description}
                    onChange={event => { setFormData({ ...formData, description: event.target.value }); }}
                    placeholder="Enter event description"
                    rows={4}
                    bg="gray.700"
                    color="white"
                    borderColor="gray.600"
                  />
                </Box>

                <HStack gap={2}>
                  <Button colorScheme="blue" onClick={() => { handleSubmit(); }}>
                    {editingEvent ? 'Update' : 'Create'}
                  </Button>
                  <Button variant="ghost" onClick={resetForm}>
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </Box>
          )}

          {loading ? (
            <Text color="gray.200">Loading events...</Text>
          ) : events.length === 0 ? (
            <Text color="gray.200">No events found. Add your first event above.</Text>
          ) : (
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
                        <Heading as="h3" size="md" color="white">
                          {event.venue}
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
