import { Stack } from '@chakra-ui/react';
import { useState } from 'react';
import QuestionsOverviewQuestion from '../../components/questions-overview-question';
import { SecondaryWrapper } from '../../components/wrappers/secondary-wrapper';
import { STACK_SPACING } from '../../../constants';
import { QUESTIONS } from '../../../mock-data';

const QuestionsOverview = ({
  name,
}: {
  name: string;
  questions: Array<{ id: string; content: string; answer: string }>;
}) => {
  const [questionsState, setQuestionsState] = useState(QUESTIONS);

  return (
    <Stack mt={10} spacing={STACK_SPACING}>
      {questionsState.map(({ id, content, answer }, index) => {
        return (
          <QuestionsOverviewQuestion
            key={id}
            question={`Q${index + 1}: ${content}`}
            answer={answer}
            handleAnswer={(answer) => {
              setQuestionsState((curQuestions) =>
                curQuestions.map((question, i) =>
                  i === index ? { ...question, answer } : question,
                ),
              );
            }}
          />
        );
      })}
    </Stack>
  );
};

QuestionsOverview.getLayout = function getLayout(
  pageContent: React.ReactElement,
) {
  return <SecondaryWrapper>{pageContent}</SecondaryWrapper>;
};

export default QuestionsOverview;
