import React, { useEffect } from 'react';
import { Text, Flex, Divider, Stack } from '@chakra-ui/react';
import SubHeader from '../../../components/headers/sub-header';
import Header from '../../../components/headers/header';
import InQuizWrapper from '../../../components/wrappers/in-quiz-wrapper';
import OverviewQuestion from '../../../components/overview-question';
import { QuizStatusEnum } from '.prisma/client';
import { trpc } from '../../../utils/trcp';
import { useTeamQuizDataStore } from '../../../state/team/team-quiz-data.state';
import { useSubscribeToQuizTeamUpdateStore } from '../../../hooks/use-subscribe-to-quiz-team-update.store';
import { useRouter } from 'next/router';
import { useSubscribeToDataChange } from '../../../supabase-utils/use-subscribe-to-data-change';

const Overview = () => {
  const router = useRouter();

  const { teamData, roundId, quizData } = useTeamQuizDataStore((state) => ({
    teamData: state.teamData,
    roundId: state.quizData.quizStatus?.currentQuestion.roundId,
    quizData: state.quizData,
  }));

  const { data, isLoading: isTeamAnswersLoading } =
    trpc.team.getTeamAnswersByTeamId.useQuery(
      {
        withAnswer: true,
        teamId: teamData.id!,
        roundId: roundId!,
      },
      {
        enabled: !!teamData.id && !!roundId,
      },
    );

  // for update of the quiz status through websocket
  useSubscribeToDataChange();

  useEffect(() => {
    if (quizData.quizStatus?.status === QuizStatusEnum.PLAYING) {
      router.push(`/${router.query.quizId}/play`);
    }
  }, [quizData.quizStatus?.status]);

  if (isTeamAnswersLoading || !data) return null;

  const { filteredTeamAnswersByRoundId, totalScore, scoresByRound } = data;

  return (
    <Stack spacing={16}>
      <Stack spacing={6}>
        {filteredTeamAnswersByRoundId?.map(
          ({ score, question, answer }, index) => (
            <OverviewQuestion
              key={question.id}
              question={question}
              questionIndex={index}
              answer={answer}
              points={score}
            />
          ),
        )}
      </Stack>
      <Stack spacing={4}>
        <Flex alignItems="center" flexDirection="column" gap={4}>
          <SubHeader>This Round’s Score</SubHeader>
          <Header size="4xl">{scoresByRound}</Header>
        </Flex>
        <Divider />
        <Flex alignItems="center" flexDirection="column" gap={1}>
          <SubHeader>Total score</SubHeader>
          <Text color={'green.100'} fontSize="xl" fontWeight="semibold">
            {totalScore}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

Overview.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <InQuizWrapper quizStatus={QuizStatusEnum.SCORE_VIEWING}>
      {pageContent}
    </InQuizWrapper>
  );
};

export default Overview;
