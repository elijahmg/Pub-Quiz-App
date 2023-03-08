import { Stack } from '@chakra-ui/react';
import { useState } from 'react';
import OverviewQuestion from '../../components/OverviewQuestion';
import { SecondaryWrapper } from '../../components/wrappers/secondary-wrapper';
import Constants from '../../constants';
import { QUESTIONS } from '../../mock-data';

export default function Boverview({
  name,
}: {
  name: string;
  questions: Array<{ id: string; content: string; answer: string }>;
}) {
  const [questionsState, setQuestionsState] = useState(QUESTIONS);

  return (
    <SecondaryWrapper>
      <Stack mt={10} spacing={Constants.StackSpacing}>
        {questionsState.map(({ id, content, answer }, index) => {
          return (
            <OverviewQuestion
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
    </SecondaryWrapper>
  );
}
