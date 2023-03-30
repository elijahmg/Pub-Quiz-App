import { Stack, Text, Input, StackProps } from '@chakra-ui/react';
import { STACK_SPACING } from '../../constants';
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
    <Stack spacing={STACK_SPACING} {...props}>
      <Text>{`Q${questionIndex + 1}: ${content}`}</Text>
      <Input value={answer} isReadOnly />
    </Stack>
  );
}
