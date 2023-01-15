import { Center, Stack, Text, Input, Button, Flex } from '@chakra-ui/react';
import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react';
import Constants from '../constants';
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
  const input = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(answer);
  const inputHandler = useCallback(
    (e: BaseSyntheticEvent<InputEvent>) => {
      setValue(e.target.value);
    },
    [setValue],
  );
  return (
    <Stack spacing={Constants.StackSpacing}>
      <Text>{question}</Text>
      <Input
        ref={input}
        value={value}
        placeholder="Do you think you know the answer?"
        onInput={inputHandler}
      />
      <PrimaryButton
        onClick={() => {
          handleAnswer(input.current?.value ?? '');
        }}
      >
        Submit
      </PrimaryButton>
    </Stack>
  );
}
