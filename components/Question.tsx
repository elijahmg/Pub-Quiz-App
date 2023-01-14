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
import Constants from '../constants';

export default function Question({
  question,
  handleAnswer,
  answer = '',
}: {
  question: string;
  answer?: string;
  handleAnswer: (s: string) => void;
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
    handleAnswer(input.current?.value ?? '');
  }, [handleAnswer]);
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <Flex justifyContent="flex-start">
          <Text fontSize="5xl">{question}</Text>
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
