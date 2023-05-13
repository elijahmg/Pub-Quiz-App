import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { TEAM_NAME } from '../../../mock-data';

export default function QuizHead() {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text as="b">{TEAM_NAME}</Text>
        <Badge
          borderRadius={6}
          px={2}
          py={1}
          textTransform="none"
          fontWeight={400}
        >
          Round {1}
        </Badge>
      </Flex>
    </Box>
  );
}
