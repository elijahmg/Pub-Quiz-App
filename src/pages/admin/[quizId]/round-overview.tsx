import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import PrimaryButton from '../../../components/buttons/primary-button';
import {
  AdminQuizControlContextWrapper,
  useAdminQuizControlContext,
} from '../../../components/contexts/admin-quiz-control-context';
import AdminQuizControlWrapper from '../../../components/wrappers/admin-quiz-control-wrapper';

const TeamsOverview = () => {
  const router = useRouter();

  const { quiz, teams, roundIndex, setRoundIndex } =
    useAdminQuizControlContext();

  const { rounds } = quiz;

  const handleStartNextRound = () => {
    setRoundIndex(roundIndex + 1);
    router.push({
      pathname: '/admin/[quizId]/quiz-control',
      query: router.query,
    });
  };

  const handleEndQuiz = () => {
    console.log('end quiz');
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              {rounds.map(({ id, name }) => (
                <Th key={id}>{name}</Th>
              ))}
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teams.map((team, teamI) => (
              <Tr key={team.id}>
                <Td>{`Team ${teamI + 1}: ${team.name}`}</Td>
                {rounds.map((round) => (
                  <Td key={round.id}>-</Td>
                ))}
                <Td>-</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {roundIndex < rounds.length - 1 ? (
        <PrimaryButton onClick={handleStartNextRound}>
          Start next round
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={handleEndQuiz}>End quiz</PrimaryButton>
      )}
    </>
  );
};

TeamsOverview.getLayout = function getLayout(pageContent: ReactElement) {
  return (
    <AdminQuizControlContextWrapper>
      <AdminQuizControlWrapper>{pageContent}</AdminQuizControlWrapper>
    </AdminQuizControlContextWrapper>
  );
};

export default TeamsOverview;
