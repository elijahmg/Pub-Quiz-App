import { Button, Stack, Heading } from '@chakra-ui/react';

export default function TeamsCheck() {
  const teams = [
    { id: 1, name: 'Team 1' },
    { id: 2, name: 'Team 2' },
    { id: 3, name: 'Team 3' },
  ];

  return (
    <Stack>
      <Stack>
        <Heading as="h2">Teams overview</Heading>
        {teams.map(({ name, id }) => (
          <Button key={id}>{name}</Button>
        ))}
      </Stack>
      <Button>Check answers</Button>
    </Stack>
  );
}
