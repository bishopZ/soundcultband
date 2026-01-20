import { Box, Flex, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { COLORS } from '../../shared/constants';

export const PublicHeader = () => {
  return (
    <Box as="header" bg="transparent" py={4} px={8} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg" color={COLORS.TEXT}>
          <RouterLink to="/" style={{ color: COLORS.TEXT }}>Soundcult</RouterLink>
        </Heading>
      </Flex>
    </Box>
  );
};

export const PrivateHeader = () => {
  return (
    <Box as="header" bg="transparent" py={4} px={8} boxShadow="sm">
      <Flex justify="space-between" align="center">
        <Heading as="h1" size="lg" color={COLORS.TEXT}>
          <RouterLink to="/product" style={{ color: COLORS.TEXT }}>Soundcult</RouterLink>
        </Heading>
        <Flex gap={4}>
          <Button asChild variant="ghost" colorScheme="whiteAlpha">
            <a href="/logout" style={{ color: COLORS.TEXT }}>Logout</a>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};