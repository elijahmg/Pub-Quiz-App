import { Text, Box, Flex, Divider } from '@chakra-ui/react';
import SubHeader from '../../../components/headers/SubHeader';
import Header from '../../../components/headers/Header';
import { SecondaryWrapper } from '../../../components/wrappers/secondary-wrapper';
import { Answer } from '../../../types';
import OverviewQuestion from '../../../components/OverviewQuestion';
import { QUESTIONS_WITH_POINTS } from '../../../mock-data';
import { STACK_SPACING } from '../../../constants';

const calculatePoints = (answers: Answer[]) => {
  return answers.reduce((total, answer) => {
    return total + answer.points;
  }, 0);
};

export default function Overview() {
  return (
    <SecondaryWrapper>
      <Flex flexDirection="column" mt={10} gap={STACK_SPACING}>
        {QUESTIONS_WITH_POINTS.map(({ id, content, answer, points }, index) => (
          <OverviewQuestion
            key={id}
            question={`Q${index + 1}: ${content}`}
            answer={answer}
            points={points}
          />
        ))}
        <Box mt={16}>
          <Flex alignItems="center" flexDirection="column" gap={4}>
            <SubHeader>This Round’s Score</SubHeader>
            <Header>{calculatePoints(QUESTIONS_WITH_POINTS).toString()}</Header>
          </Flex>
        </Box>
        <Divider />
        <Flex alignItems="center" flexDirection="column" gap={1}>
          <SubHeader>Total score</SubHeader>
          <Text color={'green.100'}>50</Text>
        </Flex>
      </Flex>
    </SecondaryWrapper>
  );
}
