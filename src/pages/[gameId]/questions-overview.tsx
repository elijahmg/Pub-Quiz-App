import { Stack } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import QuestionsOverviewQuestion from '../../components/questions-overview-question';
import InGameWrapper from '../../components/wrappers/in-game-wrapper';
import { QUESTIONS } from '../../../mock-data';

const QuestionsOverview = () => {
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

QuestionsOverview.getLayout = function getLayout(pageContent: ReactElement) {
  return <InGameWrapper>{pageContent}</InGameWrapper>;
};

export default QuestionsOverview;
