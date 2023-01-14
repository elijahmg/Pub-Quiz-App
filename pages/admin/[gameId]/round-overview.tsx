import { Button, Stack, Text, Box, Flex } from '@chakra-ui/react';

export default function RoundOverview() {
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
      <Button>Check answers</Button>
    </Stack>
  );
}
