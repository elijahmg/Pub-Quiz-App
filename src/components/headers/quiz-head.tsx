import { Badge, Box, Flex, Input, Text } from '@chakra-ui/react';

interface QuizHeadProps {
  teamName: string;
  round: string;
  topicName: string;
}

interface TopicProps {
  topicName: string;
}

function Topic({ topicName }: TopicProps) {
  return (
    <Box pt={4} pb={4}>
      <Input
        backgroundColor="gray.100"
        style={{ opacity: 1 }}
        value={topicName}
        disabled
      />
    </Box>
  );
}

export default function QuizHead({
  teamName,
  round,
  topicName,
}: QuizHeadProps) {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Box pb={4}>
          <Text as="b">{teamName}</Text>
        </Box>
        <Box pb={4}>
          <Badge
            borderRadius={6}
            px={2}
            py={1}
            textTransform="none"
            fontWeight={400}
          >
            Round {round}
          </Badge>
        </Box>
      </Flex>

      <Topic topicName={topicName} />
    </Box>
  );
}
