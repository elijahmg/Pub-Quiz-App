import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { QUESTIONS, TEAMS } from '../../../../../mock-data';
import { Question } from '../../../../../types';
import SecondaryButton from '../../../../components/buttons/secondary-button';
import {
  AdminQuizControlContextWrapper,
  useAdminQuizControlContext,
} from '../../../../components/contexts/admin-quiz-control-context';
import HighlightHeader from '../../../../components/headers/highlight-header';
import OverviewQuestion from '../../../../components/overview-question';
import AdminGameControlWrapper from '../../../../components/wrappers/admin-game-control-wrapper';

const AdminQuizTeamCheck = () => {
  const router = useRouter();

  const { quiz, teams, roundIndex } = useAdminQuizControlContext();

  const teamIndex = teams.findIndex(
    ({ id }) => id === Number(router.query.teamId),
  );
  const team = teams[teamIndex];
  const nextTeamId = teams[teamIndex + 1]?.id;

  const questions = quiz.rounds[roundIndex].questions;

  const handlePointsChange = (question: Question, points: number) => {
    console.log(question, points);
  };

  const handleBack = () => {
    router.push({
      pathname: '/admin/[gameId]/teams-overview',
      query: router.query,
    });
  };

  const handleNext = () => {
    router.push({
      pathname: '/admin/[gameId]/[teamId]',
      query: { ...router.query, teamId: nextTeamId },
    });
  };

  return (
    <>
      <HighlightHeader>
        {`Team ${teamIndex + 1}: ${team?.name}`}
      </HighlightHeader>
      {questions.map((question) => (
        <OverviewQuestion
          key={question.id}
          question={question.content}
          answer={question.answer}
          onPointsChange={(points) => handlePointsChange(question, points)}
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
      <AdminGameControlWrapper>{pageContent}</AdminGameControlWrapper>
    </AdminQuizControlContextWrapper>
  );
};

export default AdminQuizTeamCheck;
