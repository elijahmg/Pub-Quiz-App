import { ReactElement } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SecondaryButton from '../../../../components/buttons/secondary-button';
import {
  AdminQuizControlContextWrapper,
  useAdminQuizControlContext,
} from '../../../../components/contexts/admin-quiz-control-context';
import HighlightHeader from '../../../../components/headers/highlight-header';
import OverviewQuestion from '../../../../components/overview-question';
import AdminQuizControlWrapper from '../../../../components/wrappers/admin-quiz-control-wrapper';
import { trpc } from '../../../../utils/trcp';

const AdminQuizTeamCheck = () => {
  const router = useRouter();

  const { data: teams, isLoading: isTeamAnswerLoading } =
    trpc.admin.getTeamsWithAnswers.useQuery(
      {
        quizId: Number(router.query.quizId),
      },
      {
        enabled: !!router.query.quizId,
      },
    );

  const { mutate: handleTeamScoreUpdate } =
    trpc.admin.handleTeamScore.useMutation({
      onSuccess: (data) => console.log({ data }),
    });

  const { questionIndex } = useAdminQuizControlContext();

  const teamIndex =
    teams?.findIndex(({ id }) => id === Number(router.query.teamId)) ?? -1;

  const team = teams?.[teamIndex];
  const nextTeamId = teams?.[teamIndex + 1]?.id;

  const handlePointsChange = (teamAnswerId: number, points: number) => {
    handleTeamScoreUpdate({
      teamAnswerId,
      score: points,
    });
  };

  const handleBack = () => {
    router.push({
      pathname: '/admin/[quizId]/teams-overview',
      query: router.query,
    });
  };

  const handleNext = () => {
    router.push({
      pathname: '/admin/[quizId]/[teamId]',
      query: { ...router.query, teamId: nextTeamId },
    });
  };

  if (isTeamAnswerLoading || !teams) return null;

  return (
    <>
      <HighlightHeader>{`Team: ${team?.name}`}</HighlightHeader>
      {team?.answers.map((teamAnswer) => (
        <OverviewQuestion
          key={teamAnswer.question.id}
          question={teamAnswer.question}
          questionIndex={questionIndex}
          answer={teamAnswer.answer}
          points={teamAnswer.score}
          onPointsChange={(points) => handlePointsChange(teamAnswer.id, points)}
        />
      ))}
      <Flex gap={2} justifyContent="center" alignItems="center">
        <SecondaryButton
          color="secondary.100"
          borderColor="secondary.100"
          leftIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to overview
        </SecondaryButton>
        {nextTeamId && (
          <SecondaryButton
            color="secondary.100"
            borderColor="secondary.100"
            rightIcon={<ArrowForwardIcon />}
            onClick={handleNext}
          >
            Next team
          </SecondaryButton>
        )}
      </Flex>
    </>
  );
};

AdminQuizTeamCheck.getLayout = function getLayout(pageContent: ReactElement) {
  return (
    <AdminQuizControlContextWrapper>
      <AdminQuizControlWrapper>{pageContent}</AdminQuizControlWrapper>
    </AdminQuizControlContextWrapper>
  );
};

export default AdminQuizTeamCheck;
