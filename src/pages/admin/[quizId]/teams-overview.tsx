import { CheckCircleIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import PrimaryButton from '../../../components/buttons/primary-button';
import { AdminQuizControlContextWrapper } from '../../../components/contexts/admin-quiz-control-context';
import AdminQuizControlWrapper from '../../../components/wrappers/admin-quiz-control-wrapper';
import { useAdminQuizDataState } from '../../../state/admin/admin-quiz-data.state';
import { trpc } from '../../../utils/trcp';
import useResponseToast from '../../../hooks/use-response-toast';
import { QuizStatusEnum } from '.prisma/client';

interface Answer {
  score: null | number;
}

const TeamsOverview = () => {
  const router = useRouter();
  const { handleTRPCError } = useResponseToast();

  const { quizData } = useAdminQuizDataState((state) => ({
    quizData: state.quizData,
  }));

  const { mutate: updateQuizStatus } = trpc.admin.updateQuizStatus.useMutation({
    onError: handleTRPCError,
  });

  const { data: teamsWithAnswers, isLoading: isTeamsLoading } =
    trpc.admin.getTeamsWithAnswers.useQuery(
      {
        quizId: quizData.id!,
        roundId: quizData.quizStatus!.currentQuestion.roundId,
      },
      {
        enabled:
          !!quizData.id && !!quizData.quizStatus!.currentQuestion.roundId,
      },
    );

  const handleTeamClick = (teamId: number) => {
    router.push({
      pathname: '/admin/[quizId]/[teamId]',
      query: { ...router.query, teamId },
    });
  };

  const handleEndRound = async () => {
    if (!quizData?.quizStatus?.id) {
      return;
    }

    updateQuizStatus({
      id: quizData.quizStatus.id,
      quizStatus: QuizStatusEnum.SCORE_VIEWING,
    });

    router.push({
      pathname: '/admin/[quizId]/round-overview',
      query: { ...router.query },
    });
  };

  const canEndRound = useMemo(() => {
    return true;
  }, []);

  function isTeamScored(answers: Answer[]) {
    if (!answers.length) return false;

    return answers.every((answer) => answer.score !== null);
  }

  if (isTeamsLoading || !teamsWithAnswers) return null;

  return (
    <>
      {teamsWithAnswers.map((team, i) => (
        <Text
          key={team.id}
          as={Flex}
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={3}
          borderRadius="md"
          bgColor={isTeamScored(team.answers) ? 'secondary.100' : 'gray.100'}
          color={isTeamScored(team.answers) ? 'white' : 'black'}
          fontWeight={600}
          onClick={() => handleTeamClick(team.id)}
        >
          {`Team ${i + 1}: ${team.name}`}
          {isTeamScored(team.answers) && <CheckCircleIcon />}
        </Text>
      ))}
      <PrimaryButton
        testId="AdminEndRound_Button"
        onClick={handleEndRound}
        isDisabled={!canEndRound}
      >
        End round
      </PrimaryButton>
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
