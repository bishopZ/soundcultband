import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';

const Home = () => {
  return (
    <>
      <PublicHeader />
      <Container maxW="container.lg" py={12}>
        <VStack gap={12} align="stretch">
          {/* Hero Section */}
          <Box textAlign="center" py={8}>
            <Heading as="h1" size="3xl" mb={4}>
              Soundcult
            </Heading>
            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto">
              Welcome to the official website of Soundcult. Experience our music and stay connected with our latest updates.
            </Text>
          </Box>

          {/* About Section */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              About
            </Heading>
            <Text fontSize="lg" color="gray.700" lineHeight="tall">
              Soundcult is a band dedicated to creating powerful and immersive musical experiences.
              With a unique sound that blends multiple genres, we strive to connect with our audience
              through meaningful compositions and performances.
            </Text>
          </Box>

          {/* Updates Section */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              Updates
            </Heading>
            <VStack align="stretch" gap={4}>
              <Box>
                <Heading as="h3" size="md" mb={2}>
                  Latest News
                </Heading>
                <Text color="gray.700">
                  Stay tuned for upcoming releases, tour dates, and exclusive content.
                  Follow us for the latest updates and behind-the-scenes content.
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* Contact Section */}
          <Box>
            <Heading as="h2" size="xl" mb={4}>
              Contact
            </Heading>
            <Text fontSize="lg" color="gray.700" lineHeight="tall">
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
