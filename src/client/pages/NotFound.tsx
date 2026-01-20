import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Footer } from '../components/layout/footer';
import { PublicHeader } from '../components/layout/header';
import { COLORS } from '../shared/constants';

const NotFound = () => {
  return (
    <>
      <PublicHeader />
      <Container maxW="container.md" py={8}>
        <VStack gap={6} align="center">
          <Box textAlign="center">
            <Heading as="h1" size="4xl" mb={4} color={COLORS.TEXT}>
              404
            </Heading>
            <Heading as="h2" size="xl" mb={2} color={COLORS.TEXT}>
              Page Not Found
            </Heading>
            <Text fontSize="lg" color="gray.200">
              The page you&apos;re looking for doesn&apos;t exist.
            </Text>
          </Box>

          <Box>
            <Button
              as={RouterLink}
              asChild
              colorScheme="blue"
              size="lg"
            >
              <a href="/">Go Home</a>
            </Button>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
};

export default NotFound;