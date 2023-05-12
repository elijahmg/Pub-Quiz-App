import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import AdminQuestion from '../../../components/admin-question';
import AdminQuizControlRoundHead from '../../../components/admin-quiz-control-round-head';
import PrimaryButton from '../../../components/buttons/primary-button';
import {
  AdminQuizControlContextWrapper,
  useAdminQuizControlContext,
} from '../../../components/contexts/admin-quiz-control-context';
import AdminQuizControlWrapper from '../../../components/wrappers/admin-quiz-control-wrapper';

const QuizControl = () => {
  const router = useRouter();

  const { quiz, roundIndex, questionIndex, setQuestionIndex } =
    useAdminQuizControlContext();

  console.log('from agme', { quiz });

  const roundQuestions = quiz.rounds[roundIndex].questions;

  const handleNextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };

  const handleEndRound = () => {
    router.push({
      pathname: '/admin/[quizId]/teams-overview',
      query: router.query,
    });
  };

  return (
    <>
      {roundQuestions.map(
        (question, i) =>
          i <= questionIndex && (
            <AdminQuestion
              key={question.id}
              questionIndex={i}
              question={question}
            />
          ),
      )}
      {questionIndex < roundQuestions.length - 1 ? (
        <PrimaryButton onClick={handleNextQuestion}>
          Next question
        </PrimaryButton>
      ) : (
        <PrimaryButton onClick={handleEndRound}>Check answers</PrimaryButton>
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
