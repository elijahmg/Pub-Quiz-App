import { Center, Stack, Text, Input, Button, Flex } from '@chakra-ui/react';
import { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react';
import { STACK_SPACING } from '../constants';
import QuizHead from './headers/QuizHead';
import PrimaryButton from './buttons/PrimaryButton';

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

  const inputHandler = useCallback(
    (e: BaseSyntheticEvent<InputEvent>) => {
      setValue(e.target.value);
    },
    [setValue],
  );

  useEffect(() => {
    setValue(answer);
  }, [answer]);

  return (
    <Stack spacing={STACK_SPACING}>
      <Text>{question}</Text>
      <Input
        value={value}
        placeholder="Do you think you know the answer?"
        onInput={inputHandler}
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
