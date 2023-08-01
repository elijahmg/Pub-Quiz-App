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
import { trpc } from '../../../utils/trcp';
import useResponseToast from '../../../hooks/use-response-toast';
import { QuizStatusEnum } from '.prisma/client';

const TeamsOverview = () => {
  const { handleTRPCError } = useResponseToast();
  const router = useRouter();

  const {
    roundIndex,
    setRoundIndex,
    setQuestionIndex,
    quiz: quizState,
  } = useAdminQuizControlContext();

  const { rounds } = quizState;

  const { data: teamsSummary } = trpc.admin.getTeamsSummary.useQuery({
    quizId: quizState.id,
    rounds,
  });

  const { mutate: updateCurrentQuestion } =
    trpc.admin.updateCurrentQuestion.useMutation({ onError: handleTRPCError });

  const { mutate: updateQuizStatus } = trpc.admin.updateQuizStatus.useMutation({
    onSuccess: () => handleOnSuccessfullyUpdatedQuizStatus(),
    onError: handleTRPCError,
  });

  const isNextRoundExist = !!quizState.rounds?.[roundIndex + 1];

  const handleOnSuccessfullyUpdatedQuizStatus = () => {
    setRoundIndex(roundIndex + 1);
    setQuestionIndex(0);

    router.push({
      pathname: '/admin/[quizId]/quiz-control',
      query: router.query,
    });
  };

  const handleStartNextRound = async () => {
    const nextQuestionId = quizState.rounds?.[roundIndex + 1].questions[0].id;

    if (!quizState.quizStatus?.id || !nextQuestionId) return;

    updateCurrentQuestion({
      quizStatusId: quizState.quizStatus.id,
      newCurrentQuestionId: nextQuestionId,
    });

    updateQuizStatus({
      id: quizState.quizStatus.id,
      quizStatus: QuizStatusEnum.PLAYING,
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
              {rounds?.map(({ id, name }) => (
                <Th key={id}>{name}</Th>
              ))}
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {teamsSummary?.map((team, teamI) => (
              <Tr key={team.id}>
                <Td>{`Team ${teamI + 1}: ${team.name}`}</Td>
                {rounds?.map((round) => {
                  const roundSummary = team.rounds.find(
                    (roundSummary) => roundSummary.id === round.id,
                  );
                  return (
                    <Td key={round.id}>
                      {roundSummary?.totalRoundScore ?? '-'}
                    </Td>
                  );
                })}
                <Td>{team.totalScore}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isNextRoundExist ? (
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
