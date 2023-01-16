import {
  VStack,
  StackDivider,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Tfoot,
} from '@chakra-ui/react';
import { TeamAnswers } from '@prisma/client';
import { QuestionWithTeamAnswer } from '../types/main';
import React, { useMemo } from 'react';
import TeamName from '../components/TeamName';
import TeamOverviewBody from '../components/TeamOverviewBody';
import Score from './Score';

export default function TeamOverviewTable({
  name,
  questions = [],
  allowEdit = false,
}: {
  name: string;
  questions?: Array<QuestionWithTeamAnswer>;
  teamId: number;
  allowEdit?: boolean;
}) {
  const answers = useMemo((): TeamAnswers[] => {
    return questions.reduce(
      (acc, { teamAnswers = [] }) => [...acc, ...teamAnswers],
      [] as TeamAnswers[],
    );
  }, [questions]);
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="center"
    >
      <TeamName name={name} />

      <Table>
        <Thead>
          <Tr>
            <Td>Answer</Td>
            <Td isNumeric>Points</Td>
          </Tr>
        </Thead>
        <Tbody>
          <TeamOverviewBody questions={questions} allowEdit={allowEdit} />
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>
              <Score teamAnswers={answers} />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </VStack>
  );
}
