import { useState, useEffect, useRef } from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Footer } from '../components/layout/footer';

interface Event {
  id: string;
  venue: string;
  date: string;
  time: string;
  description: string;
}

/* eslint-disable-next-line max-lines-per-function */
const Home = () => {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setVideoReady(true);
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);

    // Delay video loading slightly to prioritize API requests
    // This ensures events load first on slow connections
    const videoLoadTimeout = setTimeout(() => {
      video.load();
    }, 100);

    return () => {
      clearTimeout(videoLoadTimeout);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setEventsLoading(true);
        // Fetch events immediately - this request gets priority over media files
        const response = await fetch('/api/events/public');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        // Silently fail - if no events, we just don't show the section
        console.error('Failed to fetch events:', error);
      } finally {
        setEventsLoading(false);
      }
    };

    // Start fetching immediately with high priority
    fetchEvents();
  }, []);

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
      {/* Hero Section */}
      <Box
        position="relative"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="black"
        py={0}
      >
        {/* Image Fallback */}
        <img
          src="/images/soundcult.png"
          alt="Soundcult"
          loading="lazy"
          fetchPriority="low"
          style={{
            maxWidth: '1920px',
            width: '100%',
            height: 'auto',
            display: videoReady ? 'none' : 'block',
            opacity: videoReady ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          src="/video/GOLD WATER LION_PR_sm.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          style={{
            maxWidth: '1920px',
            width: '100%',
            height: 'auto',
            display: videoReady ? 'block' : 'none',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      </Box>

      <Container maxW="container.lg" py={12}>
        <VStack gap={12} align="stretch">
          {/* Updates Section - Always render, show loading state */}
          <Box>
            <Heading as="h2" size="xl" mb={4} color="white">
              Upcoming Events
            </Heading>
            {eventsLoading ? (
              <Text color="gray.300">Loading events...</Text>
            ) : events.length > 0 ? (
              <VStack align="stretch" gap={4}>
                {events.map(event => (
                  <Box key={event.id}>
                    <Heading as="h3" size="md" mb={2} color="white">
                      {event.venue}
                    </Heading>
                    <Text color="gray.300" fontSize="sm" mb={2}>
                      {formatDateTime(event.date, event.time)}
                    </Text>
                    <Text color="gray.200">{event.description}</Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text color="gray.300">No upcoming events at this time.</Text>
            )}
          </Box>

          {/* About and Contact Section */}
          <Box>
            <Heading as="h2" size="xl" mb={4} color="white">
              About
            </Heading>
            <Text fontSize="lg" color="gray.200" lineHeight="tall" mb={6}>
              Soundcult is a band dedicated to creating powerful and immersive musical experiences.
              With a unique sound that blends multiple genres, we strive to connect with our audience
              through meaningful compositions and performances.
            </Text>
            <Heading as="h2" size="xl" mb={4} color="white">
              Contact
            </Heading>
            <Text fontSize="lg" color="gray.200" lineHeight="tall">
              For inquiries, bookings, and collaborations, please reach out through our official channels.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
