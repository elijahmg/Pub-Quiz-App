import { Stack, Text, Input } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { STACK_SPACING } from '../../constants';
import PrimaryButton from './buttons/primary-button';

export default function Question({
  question,
  handleAnswer,
  answer: propsAnswer = '',
  round,
  teamName,
  roundName,
}: {
  question: string;
  answer?: string;
  handleAnswer: (s: string) => void;
  round?: string;
  teamName?: string;
  roundName?: string;
}) {
  const [answer, setAnswer] = useState(propsAnswer);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  useEffect(() => {
    setAnswer(propsAnswer);
  }, [propsAnswer]);

  return (
    <Stack spacing={STACK_SPACING}>
      <Text>{question}</Text>
      <Input
        value={answer}
        placeholder="Do you think you know the answer?"
        onChange={inputHandler}
      />
      <PrimaryButton
        onClick={() => {
          handleAnswer(answer);
        }}
      >
        Submit
      </PrimaryButton>
    </Stack>
  );
}
