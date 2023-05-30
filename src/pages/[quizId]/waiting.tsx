import { ReactElement } from 'react';
import { Center, Stack } from '@chakra-ui/react';
import { QuizStatusEnum } from '.prisma/client';
import { AlienTaken } from '../../components/images/alien-taken';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { useLocalWebsocketServer } from '../../local-services/use-local-websocket-server';
import { useRouter } from 'next/router';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';

const Waiting = () => {
  const router = useRouter();

  const { teamName } = useTeamQuizDataStore((state) => ({
    teamName: state.teamData.name,
  }));

  useLocalWebsocketServer(
    (data) => {
      if (data.status === QuizStatusEnum.PLAYING) {
        router.push(`/${router.query.quizId}/play`);
      }
    },
    [router.query.quizId],
  );

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
