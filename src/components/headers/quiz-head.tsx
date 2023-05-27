import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';

export default function QuizHead() {
  const { teamName, roundName } = useTeamQuizDataStore((state) => ({
    teamName: state.teamData.name,
    roundName: state.quizData.quizStatus?.currentQuestion.round.name,
  }));

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text as="b">{teamName}</Text>
        <Badge
          borderRadius={6}
          px={2}
          py={1}
          textTransform="none"
          fontWeight={400}
        >
          Round: <b>{roundName}</b>
        </Badge>
      </Flex>
    </Box>
  );
}
