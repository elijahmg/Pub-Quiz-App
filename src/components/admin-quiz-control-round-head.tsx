import { TextProps } from '@chakra-ui/react';
import { useAdminQuizControlContext } from './contexts/admin-quiz-control-context';
import HighlightHeader from './headers/highlight-header';

export default function AdminQuizControlRoundHead(props: TextProps) {
  const { quiz, roundIndex } = useAdminQuizControlContext();

  const round = quiz.rounds[roundIndex];

  return (
    <HighlightHeader {...props}>
      {`Round ${roundIndex + 1}: ${round.name}`}
    </HighlightHeader>
  );
}
