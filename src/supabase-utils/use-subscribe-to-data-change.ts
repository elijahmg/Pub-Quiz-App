import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';
import { trpc } from '../utils/trcp';
import {
  QuizData,
  QuizStatusState,
  useTeamQuizDataStore,
} from '../state/team/team-quiz-data.state';

export function useSubscribeToDataChange(
  callback?: (data: QuizStatusState) => void,
) {
  // const [isQuizDataUpdated, setIsQuizDataUpdated] = useState<boolean>(false);

  const { setQuizData, quizData } = useTeamQuizDataStore((state) => ({
    setQuizData: state.setQuizData,
    quizData: state.quizData,
  }));

  const {
    data: fullQuizData,
    isSuccess: isQuizStatusDataFetched,
    isFetching,
    refetch,
  } = trpc.team.getQuizStatusById.useQuery(
    {
      quizStatusId: quizData.quizStatus!.id,
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    if (isFetching) return;

    if (isQuizStatusDataFetched && fullQuizData) {
      callback?.(fullQuizData as QuizStatusState);

      setQuizData({ ...quizData, quizStatus: fullQuizData } as QuizData);
    }
  }, [isQuizStatusDataFetched, isFetching]);

  useEffect(() => {
    const client = createClient(
      process.env.NEXT_PUBLIC_DB_URL!,
      process.env.NEXT_PUBLIC_ANON_KEY!,
    );

    const quizStatusDbChangesChannel = client
      .channel('table-filter-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'QuizStatus',
          // @TODO additional check for existing id
          filter: `id=eq.${quizData.quizStatus!.id}`,
        },
        async (data) => {
          if (!data.errors?.length) {
            await refetch({});
          }
        },
      )
      .subscribe();

    return () => {
      client.removeChannel(quizStatusDbChangesChannel);
    };
  }, []);
}
