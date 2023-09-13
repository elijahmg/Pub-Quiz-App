import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import AdminQuestion from '../../../components/admin-question';
import AdminQuizControlRoundHead from '../../../components/admin-quiz-control-round-head';
import PrimaryButton from '../../../components/buttons/primary-button';
import AdminQuizControlWrapper from '../../../components/wrappers/admin-quiz-control-wrapper';
import useResponseToast from '../../../hooks/use-response-toast';
import { trpc } from '../../../utils/trcp';
import { QuizStatusEnum } from '.prisma/client';
import {
  useAdminQuizControlContext,
  AdminQuizControlContextWrapper,
} from '../../../components/contexts/admin-quiz-control-context';

const QuizControl = () => {
  const router = useRouter();

  const { handleTRPCError } = useResponseToast();

  const [isRoundEnded, setIsRoundEnded] = useState(false);

  const {
    roundIndex,
    setQuestionIndex,
    questionIndex,
    quiz: quizData,
  } = useAdminQuizControlContext();

  const { mutate: updateQuizStatus } = trpc.admin.updateQuizStatus.useMutation({
    onError: handleTRPCError,
  });

  const { mutate: updateCurrentQuestion } =
    trpc.admin.updateCurrentQuestion.useMutation({
      onError: handleTRPCError,
      onSuccess: () => {
        const newCurrentQuestionIndex = questionIndex + 1;
        setQuestionIndex(newCurrentQuestionIndex);
      },
    });

  const roundQuestions = quizData.rounds?.[roundIndex].questions;

  const handleNextQuestion = async () => {
    const newCurrentQuestionIndex = questionIndex + 1;

    const newCurrentQuestionId =
      quizData.rounds?.[roundIndex].questions[newCurrentQuestionIndex].id;

    if (!quizData.quizStatus?.id) return;

    updateCurrentQuestion({
      quizStatusId: quizData.quizStatus?.id,
      newCurrentQuestionId: newCurrentQuestionId || -1,
    });
  };

  const handleEndRound = async () => {
    if (!quizData.id) return;

    setIsRoundEnded(true);

    updateQuizStatus({
      id: quizData.id,
      quizStatus: QuizStatusEnum.END_ROUND,
    });
  };

  const handleCheckAnswers = async () => {
    if (!quizData.id) return;

    updateQuizStatus({
      id: quizData.id,
      quizStatus: QuizStatusEnum.EVALUATION,
    });

    await router.push({
      pathname: '/admin/[quizId]/teams-overview',
      query: router.query,
    });
  };

  if (isRoundEnded) {
    return (
      <PrimaryButton
        testId="AdminCheckAnswers_Button"
        onClick={handleCheckAnswers}
      >
        Check answers
      </PrimaryButton>
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
      {/** @TODO should be done better then ! **/}
      {questionIndex < roundQuestions!.length - 1 ? (
        <PrimaryButton
          testId="AdminNextQuestion_Button"
          onClick={handleNextQuestion}
        >
          Next question
        </PrimaryButton>
      ) : (
        <PrimaryButton
          testId="AdminNextQuestion_Button"
          onClick={handleEndRound}
        >
          End round
        </PrimaryButton>
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
