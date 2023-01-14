import { Center, Stack, Text, Input, Button, Flex } from '@chakra-ui/react';
import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react';
import Constants from '../constants';
import QuizHead from './headers/QuizHead';

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
    <Center>
      <QuizHead round={'1'} teamName={'Boba'} topicName={'Name'} />
      <Stack spacing={Constants.StackSpacing}>
        <Flex justifyContent="flex-start">
          <Text fontSize="5xl">{question}</Text>
          <Input
            size="lg"
            ref={input}
            value={value}
            placeholder="Do you think you know the answer?"
            onInput={inputHandler}
          />
          <Button
            size="lg"
            onClick={() => {
              handleAnswer(input.current?.value ?? '');
            }}
          >
            {'Say what?!'}
          </Button>
        </Flex>
      </Stack>
    </Center>
  );
}
