import { Badge, Box, Flex, Input, Spacer, Text } from '@chakra-ui/react';

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
        backgroundColor={'#edf2f7'}
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
  topicName
}: QuizHeadProps) {
  return (
    <Box>
      <Flex>
        <Box pt={4} pb={4}>
          <Text as="b">{teamName}</Text>
        </Box>
        <Spacer />
        <Box pt={4} pb={4}>
          <Badge>Round {round}</Badge>
        </Box>
      </Flex>

      <Topic topicName={topicName} />
    </Box>
  );
}
