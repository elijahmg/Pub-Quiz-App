import { Button, Stack, Flex } from '@chakra-ui/react';

export default function Quiz() {
  return (
    <Stack>
      <Button>Start quiz</Button>
      <Flex>
        <Button>Edit Quiz</Button>
        <Button>Delete Quiz</Button>
      </Flex>
    </Stack>
  );
}
