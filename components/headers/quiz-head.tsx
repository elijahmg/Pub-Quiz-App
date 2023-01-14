import { Badge, Box, Flex, Input, Spacer, Text } from '@chakra-ui/react';

function Topic(props: { topicName: string }) {
  return (
    <Box pt={4} pb={4}>
      <Input
        backgroundColor={'#edf2f7'}
        style={{ opacity: 1 }}
        value={props.topicName}
        disabled
      />
    </Box>
  );
}

export default function QuizHead(props: {
  teamName: string;
  round: string;
  topicName: string;
}) {
  return (
    <Box>
      <Flex>
        <Box pt={4} pb={4}>
          <Text as="b">{props.teamName}</Text>
        </Box>
        <Spacer />
        <Box pt={4} pb={4}>
          <Badge>Round {props.round}</Badge>
        </Box>
      </Flex>

      <Topic topicName={props.topicName} />
    </Box>
  );
}
