import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react';
import {
  Center,
  Stack,
  Text,
  Input,
  Button,
  Flex,
  FormControl,
} from '@chakra-ui/react';
import Constants from '../common/constants';
import { Question as QuestionType } from '@prisma/client';

export default function Question({
  question,
  handleAnswer,
  answer = '',
}: {
  question: QuestionType;
  answer?: string;
  handleAnswer: (s: string, id: number) => void;
}) {
  const input = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(answer);
  const inputHandler = useCallback(
    (e: BaseSyntheticEvent<InputEvent>) => {
      setValue(e.target.value);
    },
    [setValue],
  );
  const onHandleAnswer = useCallback(() => {
    handleAnswer(input.current?.value ?? '', question.id);
  }, [handleAnswer]);
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <Flex justifyContent="flex-start">
          <Text fontSize="5xl">{question.content}</Text>
          <FormControl>
            <Input
              size="lg"
              ref={input}
              value={value}
              placeholder="Do you think you know the answer?"
              onInput={inputHandler}
            />
            <Button size="lg" onClick={onHandleAnswer}>
              {'Say what?!'}
            </Button>
          </FormControl>
        </Flex>
      </Stack>
    </Center>
  );
}
