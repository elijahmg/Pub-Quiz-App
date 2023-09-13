import React, { useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import QuestionsOverviewQuestion from '../../components/questions-overview-question';
import InQuizWrapper from '../../components/wrappers/in-quiz-wrapper';
import { QuizStatusEnum } from '.prisma/client';
import { trpc } from '../../utils/trcp';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';
import useResponseToast from '../../hooks/use-response-toast';
import { useSubscribeToDataChange } from '../../supabase-utils/use-subscribe-to-data-change';

const QuestionsOverview = () => {
  const router = useRouter();
  const { showSuccessToast } = useResponseToast();

  const { teamId, roundId, quizStatus } = useTeamQuizDataStore((state) => ({
    teamId: state.teamData.id,
    roundId: state.quizData.quizStatus?.currentQuestion.roundId,
    quizStatus: state.quizData.quizStatus?.status,
  }));

  useSubscribeToDataChange();

  useEffect(() => {
    if (quizStatus === QuizStatusEnum.EVALUATION) {
      router.push(`/${router.query.quizId}/break`);
    }
  }, [quizStatus]);

  const { data, isLoading } = trpc.team.getTeamAnswersByTeamId.useQuery(
    {
      teamId: teamId!,
      roundId: roundId!,
    },
    {
      enabled: !!teamId && !!roundId,
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

  if (isLoading || !data) return null;

  console.log(data);

  return (
    <Stack spacing={6}>
      {data.filteredTeamAnswersByRoundId.map((teamAnswerData, index) => {
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
