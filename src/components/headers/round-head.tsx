import { TextProps } from '@chakra-ui/react';
import HighlightHeader from './highlight-header';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';

export default function RoundHead(props: TextProps) {
  const { roundName } = useTeamQuizDataStore((state) => ({
    roundName: state.quizData.quizStatus?.currentQuestion.round.name,
  }));

  return <HighlightHeader {...props}>{`Round: ${roundName}`}</HighlightHeader>;
}
