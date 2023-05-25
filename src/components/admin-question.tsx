import { Stack, Text, Input, StackProps } from '@chakra-ui/react';
import { Question } from '../../types';

interface Props extends StackProps {
  question: Question;
  questionIndex: number;
}

export default function AdminQuestion({
  question,
  questionIndex,
  ...props
}: Props) {
  const { content, answer } = question;

  return (
    <Stack {...props}>
      <Text>{`Q${questionIndex + 1}: ${content}`}</Text>
      <Input value={answer} isReadOnly />
    </Stack>
  );
}
