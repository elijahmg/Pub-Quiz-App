import { Button, Stack, Text, Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function RoundOverview() {
  const router = useRouter();

  return (
    <Stack>
      <Flex justifyContent="flex-start">
        <Box>
          <Text>Round 1</Text>
          <Text>Question 1</Text>
          <Text>Question 2</Text>
          <Text>Question 3</Text>
          <Text>Question 4</Text>
          <Text>Answer</Text>
        </Box>
        <Box>
          <Text>Round 2</Text>
          <Text>Question 1</Text>
          <Text>Question 2</Text>
          <Text>Question 3</Text>
          <Text>Question 4</Text>
          <Text>Answer</Text>
        </Box>
      </Flex>
      {/** @TODO game id is dynamic **/}
      <Button onClick={() => router.push(`/admin/${3}/teams-check`)}>
        Check answers
      </Button>
    </Stack>
  );
}
