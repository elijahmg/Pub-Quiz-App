import { Center, Stack, Text, Input, Button, Flex } from '@chakra-ui/react';
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
        </Flex>
      </Stack>
    </Center>
  );
}
