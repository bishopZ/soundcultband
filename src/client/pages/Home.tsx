import { useState, useEffect, useRef } from 'react';
import { Box, Container, Heading, Link, Text, VStack } from '@chakra-ui/react';
import { SiInstagram, SiFacebook, SiBandcamp } from 'react-icons/si';
import MarkdownText from '../components/ui/MarkdownText';
import { Footer } from '../components/layout/footer';
import { COLORS, SOCIAL_LINKS } from '../shared/constants';

interface Event {
  id: string;
  venue: string;
  venueLink?: string;
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

    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('ended', handleEnded);

    // Delay video loading slightly to prioritize API requests
    // This ensures events load first on slow connections
    const videoLoadTimeout = setTimeout(() => {
      video.load();
    }, 100);

    return () => {
      clearTimeout(videoLoadTimeout);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('ended', handleEnded);
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
        overflow="hidden"
        bg={COLORS.BACKGROUND}
        py={0}
      >
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="hero-video-wrapper"
        >
          {/* Image Fallback */}
          <img
            src="/images/soundcult.png"
            alt="Soundcult"
            loading="lazy"
            fetchPriority="low"
            style={{
              display: videoReady ? 'none' : 'block',
              opacity: videoReady ? 0 : 1,
            }}
          />

          {/* Video */}
          <video
            ref={videoRef}
            src="/video/GOLD WATER LION_PR.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            style={{
              display: videoReady ? 'block' : 'none',
              opacity: videoReady ? 1 : 0,
            }}
          />
        </Box>
      </Box>

      <Container maxW="640px" py={12}>
        <VStack gap={12} align="stretch">
          {/* Upcoming Events Section - Only show if events exist or loading */}
          {(eventsLoading || events.length > 0) && (
            <Box>
              <Heading as="h2" size="xl" mb={4} color={COLORS.TEXT}>
                Upcoming Events
              </Heading>
              {eventsLoading && (
                <Text color="gray.300">Loading events...</Text>
              )}
              {!eventsLoading && events.length > 0 && (
                <VStack align="stretch" gap={4}>
                  {events.map(event => (
                    <Box key={event.id}>
                      <Heading as="h3" size="md" mb={2} color={COLORS.TEXT}>
                        {event.venueLink ? (
                          <Link href={event.venueLink} color="inherit" textDecoration="underline">
                            {event.venue}
                          </Link>
                        ) : (
                          event.venue
                        )}
                      </Heading>
                      <Text color="gray.300" fontSize="sm" mb={2}>
                        {formatDateTime(event.date, event.time)}
                      </Text>
                      <MarkdownText color="gray.200">{event.description}</MarkdownText>
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>
          )}

          {/* Social Links - 40x40 touch targets, 40px spacing */}
          <Box as="nav" display="flex" gap="40px" justifyContent="center" flexWrap="wrap">
            {[
              { href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: SiInstagram },
              { href: SOCIAL_LINKS.facebook, label: 'Facebook', Icon: SiFacebook },
              { href: SOCIAL_LINKS.bandcamp, label: 'Bandcamp', Icon: SiBandcamp },
            ].map(({ href, label, Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                color={COLORS.TEXT}
                width="40px"
                height="40px"
                minWidth="40px"
                minHeight="40px"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                fontSize="40px"
                _hover={{ opacity: 0.8 }}
              >
                <Icon />
              </Link>
            ))}
          </Box>

          {/* About and Contact Section */}
          <Box>
            <Heading as="h2" size="xl" mb={4} color={COLORS.TEXT}>
              About
            </Heading>
            <Text fontSize="lg" color="gray.200" lineHeight="tall" mb={6}>
              Hailing from Austin, Texas, soundcult utilizes modular synths, woodwinds, vibes, percussion, and pedal steel to create immersive and exploratory audiovisual rituals, marinated in modal jazz, Krautrock, and electroacoustic traditions. Featuring Thor Harris (Swans, Shearwater), Lyman Hardy (Ed Hall, Total Unicorn), Leila Henley (Stop Motion Orchestra), and Brent Baldwin (too many to mention), soundcult creates expansive, lush, percolating musical landscapes that pulse with energy and hypnotic force.
            </Text>
            <Text fontSize="lg" color="gray.200" lineHeight="tall">
              For inquiries, bookings, and collaborations, please reach out info@[this domain].com.
            </Text>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
