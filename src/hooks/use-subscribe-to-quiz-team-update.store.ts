import {
  QuizData,
  useTeamQuizDataStore,
} from '../state/team/team-quiz-data.state';
import { useLocalWebsocketServer } from '../local-services/use-local-websocket-server';

export function useSubscribeToQuizTeamUpdateStore() {
  const { setQuizData, quizData } = useTeamQuizDataStore((state) => ({
    setQuizData: state.setQuizData,
    quizData: state.quizData,
  }));

  useLocalWebsocketServer((data) => {
    setQuizData({ ...quizData, quizStatus: data } as QuizData);
  });
}
