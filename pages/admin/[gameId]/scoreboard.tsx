import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Heading,
  Stack,
  Button,
} from '@chakra-ui/react';

export default function Scoreboard() {
  const teamData = [
    {
      id: 1,
      name: 'Team 1',
      score: 3, // @TODO might be a need to calculate on client side
    },
    {
      id: 2,
      name: 'Team Vojtiticku',
      score: 27, // @TODO might be a need to calculate on client side
    },
    {
      id: 3,
      name: 'Team 2',
      score: 2, // @TODO might be a need to calculate on client side
    },
  ];

  function handleNextRound() {
    console.log('Start next round');
  }

  return (
    <Stack>
      <Heading as="h2">Scoreboard after Round 1</Heading>
      <Table>
        <Thead>
          <Tr>
            <Td>Team name</Td>
            <Td>Score</Td>
          </Tr>
        </Thead>
        <Tbody>
          {teamData.map((team) => (
            <Tr key={team.id}>
              <Td>{team.name}</Td>
              <Td>{team.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={handleNextRound}> Start next round</Button>
    </Stack>
  );
}
