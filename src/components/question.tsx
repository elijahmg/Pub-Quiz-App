import { Stack, Text, Input } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { STACK_SPACING } from '../../constants';
import PrimaryButton from './buttons/primary-button';

export default function Question({
  question,
  handleAnswer,
  answer = '',
  round,
  teamName,
  topicName,
}: {
  question: string;
  answer?: string;
  handleAnswer: (s: string) => void;
  round?: string;
  teamName?: string;
  topicName?: string;
}) {
  const [value, setValue] = useState(answer);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setValue(answer);
  }, [answer]);

  return (
    <Stack spacing={STACK_SPACING}>
      <Text>{question}</Text>
      <Input
        value={value}
        placeholder="Do you think you know the answer?"
        onChange={inputHandler}
      />
      <PrimaryButton
        onClick={() => {
          handleAnswer(value);
        }}
      >
        Submit
      </PrimaryButton>
    </Stack>
  );
}
