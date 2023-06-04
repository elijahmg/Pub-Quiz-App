import { Text, Input, Stack, StackProps } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { CurrentQuestion } from '../state/team/team-quiz-data.state';
import QuestionMedia from './question-media';

interface Props extends StackProps {
  question: CurrentQuestion;
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
  const { content, mediaType, mediaURL } = question;

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(e.target.value);
  };

  return (
    <Stack spacing={2} {...props}>
      <Text>{`Q${questionIndex + 1}: ${content}`}</Text>
      {!!mediaURL && !!mediaType && (
        <QuestionMedia url={mediaURL} type={mediaType} />
      )}
      <Input
        value={answer}
        placeholder="Do you think you know the answer?"
        onChange={handleAnswerChange}
      />
    </Stack>
  );
}
