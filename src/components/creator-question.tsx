import { Stack, Text, Input } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { STACK_SPACING } from '../../constants';
import { CreatorModeQuestion } from '../../types';

interface Props {
  title: string;
  question: CreatorModeQuestion;
  onQuestionChange: (question: CreatorModeQuestion) => void;
}

export default function CreatorQuestion({
  title,
  question,
  onQuestionChange,
}: Props) {
  const { content, answer } = question;

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuestionChange({ ...question, content: e.target.value });
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuestionChange({ ...question, answer: e.target.value });
  };

  return (
    <Stack spacing={STACK_SPACING}>
      <Text>{title}</Text>
      <Input
        placeholder="Type in your question"
        value={content}
        onChange={handleContentChange}
      />
      <Input
        placeholder="Type in your answer"
        value={answer}
        onChange={handleAnswerChange}
      />
    </Stack>
  );
}
