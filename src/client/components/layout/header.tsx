import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const PublicHeader = () => {
  return (
    <Box as="header" bg="transparent" py={4} px={8} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg" color="white">
          <RouterLink to="/" style={{ color: 'white' }}>Soundcult</RouterLink>
        </Heading>
      </Flex>
    </Box>
  );
};

export const PrivateHeader = () => {
  return (
    <Box as="header" bg="transparent" py={4} px={8} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg" color="white">
          <RouterLink to="/product" style={{ color: 'white' }}>Soundcult</RouterLink>
        </Heading>
        <Flex gap={4}>
          <Button asChild variant="ghost" colorScheme="whiteAlpha">
            <a href="/logout" style={{ color: 'white' }}>Logout</a>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};