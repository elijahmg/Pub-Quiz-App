import React from 'react';
import { Stack } from '@chakra-ui/react';
import QuestionsOverviewQuestion from '../../components/questions-overview-question';
import InQuizWrapper from '../../components/wrappers/in-quiz-wrapper';
import { QuizStatusEnum } from '.prisma/client';
import { trpc } from '../../utils/trcp';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';
import useResponseToast from '../../hooks/use-response-toast';

const QuestionsOverview = () => {
  const { showSuccessToast } = useResponseToast();

  const { teamId } = useTeamQuizDataStore((state) => ({
    teamId: state.teamData.id,
  }));

  const { data: teamAnswers, isLoading } =
    trpc.team.getTeamAnswersByTeamId.useQuery(
      {
        teamId: teamId!,
      },
      {
        enabled: !!teamId,
      },
    );

  const { mutate: updateTeamAnswer } = trpc.team.updateTeamAnswer.useMutation({
    onSuccess: () => showSuccessToast('New answer has been submitted'),
  });

  const handleAnswerChange = (teamAnswerId: number, answer: string) => {
    updateTeamAnswer({
      newAnswer: answer,
      teamAnswerId,
    });
  };

  if (isLoading || !teamAnswers) return null;

  return (
    <Stack spacing={6}>
      {teamAnswers.map((teamAnswerData, index) => {
        return (
          <QuestionsOverviewQuestion
            key={teamAnswerData.id}
            question={teamAnswerData.question}
            questionIndex={index}
            answer={teamAnswerData.answer}
            onAnswerChange={(answer) =>
              handleAnswerChange(teamAnswerData.id, answer)
            }
          />
        );
      })}
    </Stack>
  );
};

QuestionsOverview.getLayout = function getLayout(
  pageContent: React.ReactElement,
) {
  return (
    <InQuizWrapper quizStatus={QuizStatusEnum.END_ROUND}>
      {pageContent}
    </InQuizWrapper>
  );
};

export default QuestionsOverview;
