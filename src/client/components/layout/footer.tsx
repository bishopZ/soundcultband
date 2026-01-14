import { Box, Flex, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer" bg="transparent" py={4} px={8} mt="auto">
      <Flex justify="center">
        <Text fontSize="sm" color="gray.300">
          &copy; {new Date().getFullYear()} Soundcult. All rights reserved.
        </Text>
      </Flex>
    </Box>
  );
};