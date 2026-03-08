import { Box, Link, Text } from '@chakra-ui/react';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';

interface MarkdownTextProps {
  children: string;
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  mt?: number | string;
}

const MarkdownText = ({
  children,
  color = 'gray.200',
  fontSize,
  lineHeight,
  mt,
}: MarkdownTextProps) => {
  const components: Components = {
    p: ({ children: pChildren }) => (
      <Text as="p" color={color} fontSize={fontSize} lineHeight={lineHeight} mb={2}>
        {pChildren}
      </Text>
    ),
    a: ({ href, children: aChildren }) => (
      <Link href={href} color="inherit" textDecoration="underline" target="_blank" rel="noopener noreferrer">
        {aChildren}
      </Link>
    ),
  };

  return (
    <Box color={color} fontSize={fontSize} lineHeight={lineHeight} mt={mt}>
      <ReactMarkdown components={components}>{children}</ReactMarkdown>
    </Box>
  );
};

export default MarkdownText;
