import { Button, Stack, Text, Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function RoundOverview() {
  const router = useRouter();

  const rounds = [
    {
      id: 1,
      name: 'Music',
      questions: [
        {
          id: 1,
          content: 'Where is John',
          answer: 'here',
        },
      ],
    },
  ];

  return (
    <Stack>
      <Flex justifyContent="flex-start">
        {rounds.map((round) => (
          <Box key={round.id}>
            <Text>Round {round.name}</Text>
            {round.questions.map((question) => (
              <Box key={question.id}>
                <Text>{question.content}</Text>
                <Text>{question.answer}</Text>
              </Box>
            ))}
          </Box>
        ))}
      </Flex>
      {/** @TODO game id is dynamic **/}
      <Button onClick={() => router.push(`/admin/${3}/teams-check`)}>
        Check answers
      </Button>
    </Stack>
  );
}
