import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Question from '../../components/question';
import InQuizWrapper from '../../components/wrappers/in-quiz-wrapper';
import { Stack } from '@chakra-ui/react';
import PrimaryButton from '../../components/buttons/primary-button';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';
import { trpc } from '../../utils/trcp';
import { QuizStatusEnum, TeamAnswers } from '.prisma/client';
import useResponseToast from '../../hooks/use-response-toast';
import { useSubscribeToQuizTeamUpdateStore } from '../../hooks/use-subscribe-to-quiz-team-update.store';

const Play = () => {
  const router = useRouter();
  const { handleTRPCError } = useResponseToast();

  const [questionIndex, setQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState('');
  const [currentTeamAnswerId, setCurrentTeamAnswerId] = useState<
    number | undefined
  >();

  const { quizData, teamData } = useTeamQuizDataStore((state) => ({
    quizData: state.quizData,
    teamData: state.teamData,
  }));

  // for update of the quiz status through websocket
  useSubscribeToQuizTeamUpdateStore();

  useEffect(() => {
    if (quizData.quizStatus?.status === QuizStatusEnum.END_ROUND) {
      router.push(`/${router.query.quizId}/questions-overview`);
    }
  }, [quizData.quizStatus?.status]);

  const onSubmittedAnswerSuccessfully = (data: TeamAnswers) => {
    setCurrentTeamAnswerId(data.id);
  };

  const { mutate: submitAnswer } = trpc.team.submitAnswer.useMutation({
    onSuccess: onSubmittedAnswerSuccessfully,
    onError: handleTRPCError,
  });

  const handleAnswerChange = (answer: string) => {
    setAnswer(answer);
  };

  const currentQuestionId = quizData.quizStatus?.currentQuestion.id;

  useEffect(() => {
    setAnswer('');
    setCurrentTeamAnswerId(0);
  }, [currentQuestionId]);

  const handleSubmit = async () => {
    if (!teamData.id || !quizData.quizStatus!.currentQuestion.id) return;

    // @TODO added notification and error handling
    await submitAnswer({
      answer,
      questionId: quizData.quizStatus!.currentQuestion.id,
      teamId: teamData.id,
      teamAnswerId: currentTeamAnswerId,
    });
  };

  return (
    <Stack spacing={2}>
      <Question
        question={quizData.quizStatus!.currentQuestion}
        questionIndex={questionIndex}
        answer={answer}
        onAnswerChange={handleAnswerChange}
      />
      <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
    </Stack>
  );
};

Play.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <InQuizWrapper>{pageContent}</InQuizWrapper>;
};

export default Play;
