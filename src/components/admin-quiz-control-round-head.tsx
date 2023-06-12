import { TextProps } from '@chakra-ui/react';
import HighlightHeader from './headers/highlight-header';
import { useAdminQuizDataState } from '../state/admin/admin-quiz-data.state';

export default function AdminQuizControlRoundHead(props: TextProps) {
  const { quizData } = useAdminQuizDataState((state) => ({
    quizData: state.quizData,
  }));

  const roundIndex =
    quizData.rounds?.findIndex(
      (round) => round.id === quizData.quizStatus?.currentQuestion.roundId,
    ) ?? -1;

  const roundName = quizData.rounds?.[roundIndex].name;

  return (
    <HighlightHeader {...props}>
      {`Round ${roundIndex + 1}: ${roundName}`}
    </HighlightHeader>
  );
}
