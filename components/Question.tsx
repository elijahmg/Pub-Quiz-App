import {
  Center,
  Stack,
  Text,
  Input,
  Button,
  Flex,
  FormControl,
} from '@chakra-ui/react';
import { useRef } from 'react';
import Constants from '../constants';

export default function Question({
  question,
  handleAnswer,
}: {
  question: string;
  handleAnswer: (s: string) => void;
}) {
  const input = useRef<HTMLInputElement | null>(null);
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <Flex justifyContent="flex-start">
          <Text fontSize="5xl">{question}</Text>
          <FormControl>
            <Input
              size="lg"
              ref={input}
              placeholder="Do you think you know the answer?"
            />
            <Button
              size="lg"
              onClick={() => {
                handleAnswer(input.current?.value ?? '');
              }}
            >
              {'Say what?!'}
            </Button>
          </FormControl>
        </Flex>
      </Stack>
    </Center>
  );
}
