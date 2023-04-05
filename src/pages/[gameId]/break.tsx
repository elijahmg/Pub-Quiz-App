import { Center, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BOGUS_OBJECT } from '../../../constants';
import { QuizStatus } from '../../../types';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { Alcoholism } from '../../components/images/alcoholism';
import { useUserStore } from '../../components/stores/user-store';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';

const Break = () => {
  const router = useRouter();

  const userStore = useUserStore(({ quiz }) => ({ quiz }));

  const { status } = userStore.quiz ?? BOGUS_OBJECT;

  useEffect(() => {
    if (status === QuizStatus.SCORE_VIEWING) {
      router.push({ pathname: 'overview', query: router.query });
    }

    // @TODO REMOVE
    setTimeout(() => {
      router.push({ pathname: 'overview', query: router.query });
    }, 1000);
  }, [status]);

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
