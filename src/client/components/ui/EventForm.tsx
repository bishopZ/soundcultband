import { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { COLORS } from '../../shared/constants';

export interface EventFormData {
  venue: string;
  venueLink?: string;
  date: string;
  time: string;
  description: string;
}

interface EventFormProps {
  initialData?: EventFormData | null;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
}

const EventForm = ({ initialData, onSubmit, onCancel }: EventFormProps) => {
  const [formData, setFormData] = useState<EventFormData>(
    () => initialData ?? { venue: '', date: '', time: '', description: '' },
  );

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isEditing = Boolean(initialData);

  return (
    <Box bg="gray.800" p={6} borderRadius="md" border="1px" borderColor="gray.700">
      <VStack gap={4} align="stretch">
        <Heading as="h2" size="lg" color={COLORS.TEXT}>
          {isEditing ? 'Edit Event' : 'Add Event'}
        </Heading>

        <Box>
          <Text mb={2} color={COLORS.TEXT} fontWeight="medium">
            Venue *
          </Text>
          <Input
            value={formData.venue}
            onChange={event => { setFormData({ ...formData, venue: event.target.value }); }}
            placeholder="Enter venue name"
            bg="gray.700"
            color={COLORS.TEXT}
            borderColor="gray.600"
          />
        </Box>

        <Box>
          <Text mb={2} color={COLORS.TEXT} fontWeight="medium">
            Venue Link (optional)
          </Text>
          <Input
            type="url"
            value={formData.venueLink ?? ''}
            onChange={event => { setFormData({ ...formData, venueLink: event.target.value || undefined }); }}
            placeholder="https://..."
            bg="gray.700"
            color={COLORS.TEXT}
            borderColor="gray.600"
          />
        </Box>

        <Box>
          <Text mb={2} color={COLORS.TEXT} fontWeight="medium">
            Date *
          </Text>
          <Input
            type="date"
            value={formData.date}
            onChange={event => { setFormData({ ...formData, date: event.target.value }); }}
            bg="gray.700"
            color={COLORS.TEXT}
            borderColor="gray.600"
          />
        </Box>

        <Box>
          <Text mb={2} color={COLORS.TEXT} fontWeight="medium">
            Time *
          </Text>
          <Input
            type="time"
            value={formData.time}
            onChange={event => { setFormData({ ...formData, time: event.target.value }); }}
            bg="gray.700"
            color={COLORS.TEXT}
            borderColor="gray.600"
          />
        </Box>

        <Box>
          <Text mb={2} color={COLORS.TEXT} fontWeight="medium">
            Description *
          </Text>
          <Textarea
            value={formData.description}
            onChange={event => { setFormData({ ...formData, description: event.target.value }); }}
            placeholder="Enter event description"
            rows={4}
            bg="gray.700"
            color={COLORS.TEXT}
            borderColor="gray.600"
            autoresize
          />
          <Text mt={2} fontSize="sm" color="gray.400">
            Accepts{' '}
            <Link
              href="https://www.markdownguide.org/cheat-sheet/"
              target="_blank"
              rel="noopener noreferrer"
              color="blue.300"
            >
              Markdown
            </Link>{' '}
            format
          </Text>
        </Box>

        <HStack gap={10}>
          <Button onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Create'}
          </Button>
          <Button onClick={onCancel}>
            Cancel
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default EventForm;
