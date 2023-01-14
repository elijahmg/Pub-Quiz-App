import { Button, Stack, Heading } from '@chakra-ui/react';

export default function TeamsCheck() {
  return (
    <Stack>
      <Stack>
        <Heading as="h2">Teams overview</Heading>
        <Button>Team 1</Button>
        <Button>Team 2</Button>
        <Button>Team 3</Button>
      </Stack>
      <Button>Check answers</Button>
    </Stack>
  );
}
