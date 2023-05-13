import { Center, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { Alcoholism } from '../../components/images/alcoholism';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import { useLocalWebsocketServer } from '../../local-services/useLocalWebsocketServer';
import { QuizStatuses } from '../../server/types';

const Break = () => {
  const router = useRouter();

  useLocalWebsocketServer((data) => {
    if (data.status === QuizStatuses.SCORE_VIEWING) {
      router.push({ pathname: 'overview', query: router.query });
    }
  });

  return (
    <Stack as={Center} spacing={6}>
      <Alcoholism />
      <Stack>
        <SubHeader>Time for a break.</SubHeader>
        <SubTitle>
          Your quizmasters is checking your answers. In the meantime, have a
          chat and/or drink, we don&apos;t judge :)
        </SubTitle>
      </Stack>
    </Stack>
  );
};

Break.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <MainPageWrapper header="Checking answers" spacing={14}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default Break;
