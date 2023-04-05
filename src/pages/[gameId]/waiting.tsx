import { ReactElement, useEffect } from 'react';
import { Center, Stack } from '@chakra-ui/react';
import { AlienTaken } from '../../components/images/alien-taken';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { useUserStore } from '../../components/stores/user-store';
import { BOGUS_OBJECT } from '../../../constants';
import { QuizStatus } from '../../../types';
import { useRouter } from 'next/router';

const Waiting = () => {
  const router = useRouter();

  const userStore = useUserStore(({ quiz, team }) => ({ quiz, team }));

  const { status } = userStore.quiz ?? BOGUS_OBJECT;

  useEffect(() => {
    if (status === QuizStatus.PLAYING) {
      router.push({ pathname: 'play', query: router.query });
    }

    // @TODO REMOVE
    setTimeout(() => {
      router.push({ pathname: 'play', query: router.query });
    }, 1000);
  }, [status]);

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
