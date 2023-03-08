import { Stack } from '@chakra-ui/react';
import { useState } from 'react';
import BOverviewQuestion from '../../components/bOverviewQuestion';
import { SecondaryWrapper } from '../../components/wrappers/secondary-wrapper';
import { STACK_SPACING } from '../../constants';
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
      <Stack mt={10} spacing={STACK_SPACING}>
        {questionsState.map(({ id, content, answer }, index) => {
          return (
            <BOverviewQuestion
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
