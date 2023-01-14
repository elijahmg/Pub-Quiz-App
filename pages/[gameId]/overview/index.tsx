import {
  VStack,
  Box,
  StackDivider,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Text,
  Heading,
  Tfoot,
} from '@chakra-ui/react';
import { string } from 'prop-types';

interface Answer {
  title: string;
  points: number;
}

export default function Overview() {
  const teamName = 'Super Team';

  const answers: Answer[] = [
    {
      title: 'q 1',
      points: 1,
    },
    {
      title: 'q 2',
      points: 2,
    },
    {
      title: 'q 3',
      points: 3,
    },
  ];

  function calculateSum(array: Answer[]) {
    return array.reduce((accumulator, object) => {
      return accumulator + object['points'];
    }, 0);
  }

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="center"
    >
      <Heading>{teamName}</Heading>

      <Table>
        <Thead>
          <Th>Answer</Th>
          <Th isNumeric>Points</Th>
        </Thead>
        <Tbody>
          {answers.map((value) => (
            <Tr key={value.title}>
              <Td>{value.title}</Td>
              <Td isNumeric>{value.points}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Heading size={'md'}>Total: {calculateSum(answers)}</Heading>
          </Tr>
        </Tfoot>
      </Table>
    </VStack>
  );
}
