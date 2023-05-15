import { Text, Flex, Divider, Stack } from '@chakra-ui/react';
import SubHeader from '../../../components/headers/sub-header';
import Header from '../../../components/headers/header';
import InQuizWrapper from '../../../components/wrappers/in-quiz-wrapper';
import { Answer } from '../../../../types';
import OverviewQuestion from '../../../components/overview-question';
import { QUESTIONS_WITH_POINTS } from '../../../../mock-data';

const calculatePoints = (answers: Answer[]) => {
  return answers.reduce((total, answer) => {
    return total + answer.points;
  }, 0);
};

const Overview = () => {
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
  return <InQuizWrapper>{pageContent}</InQuizWrapper>;
};

export default Overview;
