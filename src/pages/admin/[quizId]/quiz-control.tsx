import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import AdminQuestion from '../../../components/admin-question';
import AdminQuizControlRoundHead from '../../../components/admin-quiz-control-round-head';
import PrimaryButton from '../../../components/buttons/primary-button';
import {
  AdminQuizControlContextWrapper,
  useAdminQuizControlContext,
} from '../../../components/contexts/admin-quiz-control-context';
import AdminQuizControlWrapper from '../../../components/wrappers/admin-quiz-control-wrapper';
import useResponseToast from '../../../hooks/use-response-toast';
import { trpc } from '../../../utils/trcp';
import { useAdminQuizDataState } from '../../../state/admin/admin-quiz-data.state';
import { QuizStatusEnum } from '.prisma/client';

const QuizControl = () => {
  const router = useRouter();

  const { handleTRPCError } = useResponseToast();

  const [isRoundEnded, setIsRoundEnded] = useState(false);

  const { quiz, roundIndex, questionIndex, setQuestionIndex } =
    useAdminQuizControlContext();

  const quizData = useAdminQuizDataState((state) => state.quizData);

  const { mutate: updateQuizStatus } = trpc.admin.updateQuizStatus.useMutation({
    onError: handleTRPCError,
  });

  const { mutate: updateCurrentQuestion } =
    trpc.admin.updateCurrentQuestion.useMutation({ onError: handleTRPCError });

  const roundQuestions = quiz.rounds[roundIndex].questions;

  const handleNextQuestion = async () => {
    const newCurrentQuestionIndex = questionIndex + 1;

    const newCurrentQuestionId =
      quiz.rounds[roundIndex].questions[newCurrentQuestionIndex].id;

    await updateCurrentQuestion({
      quizStatusId: quiz.quizStatus.id,
      newCurrentQuestionId: newCurrentQuestionId || -1,
    });

    setQuestionIndex(newCurrentQuestionIndex);
  };

  const handleEndRound = async () => {
    if (!quizData.id) return;

    setIsRoundEnded(true);

    await updateQuizStatus({
      id: quizData.id,
      quizStatus: QuizStatusEnum.END_ROUND,
    });
  };

  const handleCheckAnswers = async () => {
    if (!quizData.id) return;

    await updateQuizStatus({
      id: quizData.id,
      quizStatus: QuizStatusEnum.EVALUATION,
    });

    router.push({
      pathname: '/admin/[quizId]/teams-overview',
      query: router.query,
    });
  };

  if (isRoundEnded) {
    return (
      <PrimaryButton onClick={handleCheckAnswers}>Check answers</PrimaryButton>
    );
  }

  return (
    <>
      {roundQuestions?.map(
        (question, i) =>
          i <= questionIndex && (
            <AdminQuestion
              key={question.id}
              questionIndex={i}
              question={question}
            />
          ),
      )}
      {questionIndex < roundQuestions!.length - 1 ? (
        <PrimaryButton onClick={handleNextQuestion}>
          Next question
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={handleEndRound}>End round</PrimaryButton>
      )}
    </>
  );
};

QuizControl.getLayout = function getLayout(pageContent: ReactElement) {
  return (
    <AdminQuizControlContextWrapper>
      <AdminQuizControlWrapper>
        <AdminQuizControlRoundHead />
        {pageContent}
      </AdminQuizControlWrapper>
    </AdminQuizControlContextWrapper>
  );
};

export default QuizControl;
