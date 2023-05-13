import { ReactElement } from 'react';
import { Center, Stack } from '@chakra-ui/react';
import { AlienTaken } from '../../components/images/alien-taken';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { useLocalWebsocketServer } from '../../local-services/useLocalWebsocketServer';
import { useRouter } from 'next/router';
import { QuizStatuses } from '../../server/types';
import { useUserStore } from '../../components/stores/user-store';

const Waiting = () => {
  const router = useRouter();

  const userStore = useUserStore(({ quiz, team }) => ({ quiz, team }));

  // @TODO instead of local websocket server here should be higher abstraction
  // @TODO to support both cases - local and prod supabase DB instance
  useLocalWebsocketServer((data) => {
    if (data.status === QuizStatuses.PLAYING) {
      router.push(`/${router.query.quizId}/play`);
    }
  });

  return (
    <Stack as={Center} spacing={6}>
      <AlienTaken />
      <Stack>
        <SubHeader textAlign="left">
          {`Don't worry ${userStore.team?.name}, the quiz will start in a few moments.`}
        </SubHeader>
        <SubTitle textAlign="left">Grab a drink in the meantime!</SubTitle>
      </Stack>
    </Stack>
  );
};

Waiting.getLayout = function getLayout(pageContent: ReactElement) {
  return (
    <MainPageWrapper header="Getting Ready" spacing={14}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default Waiting;
