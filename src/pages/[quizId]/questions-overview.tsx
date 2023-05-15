import { Stack } from '@chakra-ui/react';
import { useState } from 'react';
import QuestionsOverviewQuestion from '../../components/questions-overview-question';
import InQuizWrapper from '../../components/wrappers/in-quiz-wrapper';
import { QUESTIONS } from '../../../mock-data';

const QuestionsOverview = () => {
  // TODO Replace mock data
  const [questionsState, setQuestionsState] = useState(QUESTIONS);

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setQuestionsState((curQuestions) =>
      curQuestions.map((question, i) =>
        i === questionIndex ? { ...question, answer } : question,
      ),
    );
  };

  return (
    <Stack spacing={6}>
      {questionsState.map((question, index) => {
        return (
          <QuestionsOverviewQuestion
            key={question.id}
            question={question}
            questionIndex={index}
            answer={'answer quess'} // @TODO Here goes the answer of the team
            onAnswerChange={(answer) => handleAnswerChange(index, answer)}
          />
        );
      })}
    </Stack>
  );
};

QuestionsOverview.getLayout = function getLayout(
  pageContent: React.ReactElement,
) {
  return <InQuizWrapper>{pageContent}</InQuizWrapper>;
};

export default QuestionsOverview;
