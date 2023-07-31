import { Center, Stack } from '@chakra-ui/react';
import SubHeader from '../../components/headers/sub-header';
import SubTitle from '../../components/headers/sub-title';
import { Alcoholism } from '../../components/images/alcoholism';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';
import { useEffect } from 'react';
import { QuizStatusEnum } from '.prisma/client';
import { useRouter } from 'next/router';
import { useSubscribeToDataChange } from '../../supabase-utils/use-subscribe-to-data-change';

const Break = () => {
  const router = useRouter();

  const { quizData } = useTeamQuizDataStore((state) => ({
    quizData: state.quizData,
  }));

  // for update of the quiz status through websocket
  useSubscribeToDataChange();

  useEffect(() => {
    if (quizData.quizStatus?.status === QuizStatusEnum.SCORE_VIEWING) {
      router.push(`/${router.query.quizId}/overview`);
    }
  }, [quizData.quizStatus?.status]);

  return (
    <Stack as={Center} spacing={6}>
      <Alcoholism />
      <Stack>
        <SubHeader>Time for a break.</SubHeader>
        <SubTitle>
          Your quiz master is checking your answers. In the meantime, have a
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
