import { Box, Flex, Link, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box as="footer" bg="transparent" py={4} px={8} mt="auto">
      <Flex justify="center">
        <Text fontSize="sm" color="gray.300">
          &copy; {new Date().getFullYear()} Soundcult. All rights reserved.
          <br />
          Created by <Link href="https://time2magic.com" target="_blank" color="gray.300">Time 2 Magic</Link>.
        </Text>
      </Flex>
    </Box>
  );
};