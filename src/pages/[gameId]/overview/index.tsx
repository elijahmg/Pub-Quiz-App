import { Text, Flex, Divider, Stack } from '@chakra-ui/react';
import SubHeader from '../../../components/headers/sub-header';
import Header from '../../../components/headers/header';
import InGameWrapper from '../../../components/wrappers/in-game-wrapper';
import { Answer, QuizStatus } from '../../../../types';
import OverviewQuestion from '../../../components/overview-question';
import { QUESTIONS_WITH_POINTS } from '../../../../mock-data';
import { useEffect } from 'react';
import { useUserStore } from '../../../components/stores/user-store';
import { useRouter } from 'next/router';
import { BOGUS_OBJECT } from '../../../../constants';

const calculatePoints = (answers: Answer[]) => {
  return answers.reduce((total, answer) => {
    return total + answer.points;
  }, 0);
};

const Overview = () => {
  const router = useRouter();

  const userStore = useUserStore(({ quiz }) => ({ quiz }));

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
    <Stack spacing={16}>
      <Stack spacing={6}>
        {QUESTIONS_WITH_POINTS.map(({ points, ...question }, index) => (
          <OverviewQuestion
            key={question.id}
            question={question}
            questionIndex={index}
            answer={'answer quess'} // @TODO Here goes the answer of the team
            points={points}
          />
        ))}
      </Stack>
      <Stack spacing={4}>
        <Flex alignItems="center" flexDirection="column" gap={4}>
          <SubHeader>This Round’s Score</SubHeader>
          <Header size="4xl">
            {calculatePoints(QUESTIONS_WITH_POINTS).toString()}
          </Header>
        </Flex>
        <Divider />
        <Flex alignItems="center" flexDirection="column" gap={1}>
          <SubHeader>Total score</SubHeader>
          <Text color={'green.100'} fontSize="xl" fontWeight="semibold">
            50
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};

Overview.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <InGameWrapper>{pageContent}</InGameWrapper>;
};

export default Overview;
