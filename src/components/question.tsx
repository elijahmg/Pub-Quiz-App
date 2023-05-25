import { Text, Input, Stack, StackProps } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import type { Question } from '../../types';

interface Props extends StackProps {
  question: Question;
  questionIndex: number;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export default function Question({
  question,
  questionIndex,
  answer,
  onAnswerChange,
  ...props
}: Props) {
  const { content } = question;

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(e.target.value);
  };

  return (
    <Stack spacing={2} {...props}>
      <Text>{`Q${questionIndex + 1}: ${content}`}</Text>
      <Input
        value={answer}
        placeholder="Do you think you know the answer?"
        onChange={handleAnswerChange}
      />
    </Stack>
  );
}
