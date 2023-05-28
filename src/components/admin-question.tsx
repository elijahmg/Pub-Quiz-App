import { Stack, Text, Input, StackProps } from '@chakra-ui/react';
import { QuestionSelection } from '../state/admin/admin-quiz-data.state';

interface Props extends StackProps {
  question: QuestionSelection;
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
