import { BaseSyntheticEvent, useCallback, useRef, useState } from 'react';
import {
  Text,
  Input,
  Button,
  FormControl,
  Stack,
  Center,
} from '@chakra-ui/react';
import { Question as QuestionType } from '@prisma/client';
import constants from '../common/constants';

export default function Question({
  question,
  handleAnswer,
  answer = '',
  allowEdit,
}: {
  question: QuestionType;
  answer?: string;
  handleAnswer: (s: string, id: number) => void;
  allowEdit: boolean;
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
  }, [handleAnswer, question.id]);
  return (
    <Center>
      <Stack spacing={constants.StackSpacing}>
        <Text fontSize="5xl">{question.content}</Text>
        <FormControl>
          <Input
            size="lg"
            ref={input}
            value={value}
            placeholder="Do you think you know the answer?"
            onInput={inputHandler}
          />
          {allowEdit && (
            <Button size="lg" onClick={onHandleAnswer}>
              {'Say what?!'}
            </Button>
          )}
        </FormControl>
      </Stack>
    </Center>
  );
}
