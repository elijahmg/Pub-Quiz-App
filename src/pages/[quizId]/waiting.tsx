import { Center } from '@chakra-ui/react';
import { AlienTaken } from '../../components/images/alien-taken';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { useLocalWebsocketServer } from '../../local-services/useLocalWebsocketServer';
import { useRouter } from 'next/router';
import { QuizStatuses } from '../../server/types';

const Waiting = () => {
  const router = useRouter();

  // @TODO instead of local websocket server here should be higher abstraction
  // @TODO to support both cases - local and prod supabase DB instance
  useLocalWebsocketServer((data) => {
    if (data.status === QuizStatuses.PLAYING) {
      router.push(`/${router.query.quizId}/play`);
    }
  });

  return (
    <Center flexDirection="column">
      <AlienTaken />
      <SubHeader mt={6} mb={2}>
        Don&apos;t worry Quirky Owls, the quiz will start in a few moments.
      </SubHeader>
      <SubTitle>Grab a drink in the meantime!</SubTitle>
    </Center>
  );
};

Waiting.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <MainPageWrapper header="Getting Ready">{pageContent}</MainPageWrapper>
  );
};

export default Waiting;
