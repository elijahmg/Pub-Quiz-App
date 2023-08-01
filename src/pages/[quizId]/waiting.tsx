import { ReactElement } from 'react';
import { Center, Stack } from '@chakra-ui/react';
import { QuizStatusEnum } from '.prisma/client';
import { AlienTaken } from '../../components/images/alien-taken';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { useRouter } from 'next/router';
import {
  QuizStatusState,
  useTeamQuizDataStore,
} from '../../state/team/team-quiz-data.state';
import { useSubscribeToDataChange } from '../../supabase-utils/use-subscribe-to-data-change';

const Waiting = () => {
  const router = useRouter();

  const { teamName } = useTeamQuizDataStore((state) => ({
    teamName: state.teamData.name,
  }));

  useSubscribeToDataChange(dataChangesCallback);

  function dataChangesCallback(data: QuizStatusState) {
    if (data.status === QuizStatusEnum.PLAYING) {
      router.push(`/${router.query.quizId}/play`);
    }
  }

  return (
    <Stack as={Center} spacing={6}>
      <AlienTaken />
      <Stack>
        <SubHeader textAlign="left">
          {`Don't worry ${teamName}, the quiz will start in a few moments.`}
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
