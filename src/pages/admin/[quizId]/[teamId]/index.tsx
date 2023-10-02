import { ReactElement } from 'react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SecondaryButton from '../../../../components/buttons/secondary-button';
import { AdminQuizControlContextWrapper } from '../../../../components/contexts/admin-quiz-control-context';
import HighlightHeader from '../../../../components/headers/highlight-header';
import OverviewQuestion from '../../../../components/overview-question';
import AdminQuizControlWrapper from '../../../../components/wrappers/admin-quiz-control-wrapper';
import { trpc } from '../../../../utils/trcp';
import { useAdminQuizDataState } from '../../../../state/admin/admin-quiz-data.state';

const AdminQuizTeamCheck = () => {
  const router = useRouter();

  const { quizData } = useAdminQuizDataState((state) => ({
    quizData: state.quizData,
  }));

  const { data: teams, isLoading: isTeamAnswerLoading } =
    trpc.admin.getTeamsWithAnswers.useQuery(
      {
        quizId: Number(router.query.quizId),
        roundId: quizData.quizStatus!.currentQuestion.roundId,
      },
      {
        enabled:
          !!router.query.quizId &&
          !!quizData.quizStatus?.currentQuestion.roundId,
        cacheTime: 0,
      },
    );

  const { mutate: handleTeamScoreUpdate } =
    trpc.admin.handleTeamScore.useMutation();

  const handlePointsChange = (teamAnswerId: number, points: number) => {
    handleTeamScoreUpdate({
      teamAnswerId,
      score: points,
    });
  };

  function handleBack() {
    router.push({
      pathname: '/admin/[quizId]/teams-overview',
      query: { quizId: router.query.quizId },
    });
  }

  function handleNext() {
    router.push({
      pathname: '/admin/[quizId]/[teamId]',
      query: { ...router.query, teamId: nextTeamId },
    });
  }

  if (isTeamAnswerLoading || !teams) return null;

  const teamIndex =
    teams.findIndex(({ id }) => id === Number(router.query.teamId)) ?? -1;

  const team = teams[teamIndex];
  const nextTeamId = teams[teamIndex + 1]?.id;

  return (
    <>
      <HighlightHeader>{`Team: ${team?.name}`}</HighlightHeader>
      {team!.answers.map((teamAnswer, index) => (
        <OverviewQuestion
          key={teamAnswer.id}
          question={teamAnswer.question}
          questionIndex={index}
          answer={teamAnswer.answer}
          points={teamAnswer.score}
          onPointsChange={(points) => handlePointsChange(teamAnswer.id, points)}
        />
      ))}
      <Flex gap={2} justifyContent="center" alignItems="center">
        <SecondaryButton
          testId="AdminBackToOverview_Button"
          color="secondary.100"
          borderColor="secondary.100"
          leftIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to overview
        </SecondaryButton>
        {nextTeamId && (
          <SecondaryButton
            testId="AdminNextTeam_Button"
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
