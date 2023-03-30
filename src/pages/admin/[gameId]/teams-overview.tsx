import { CheckCircleIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import { TEAMS } from '../../../../mock-data';
import PrimaryButton from '../../../components/buttons/primary-button';
import { AdminQuizControlContextWrapper } from '../../../components/contexts/admin-quiz-control-context';
import AdminGameControlWrapper from '../../../components/wrappers/admin-game-control-wrapper';

const TeamsOverview = () => {
  const router = useRouter();

  const handleTeamClick = (teamId: number) => {
    router.push({
      pathname: '/admin/[gameId]/[teamId]',
      query: { ...router.query, teamId },
    });
  };

  const handleEndRound = () => {
    router.push({
      pathname: '/admin/[gameId]/round-overview',
      query: { ...router.query },
    });
  };

  const canEndRound = useMemo(() => {
    return true;
  }, []);

  return (
    <>
      {TEAMS.map(({ id, name }, i) => (
        <Text
          key={id}
          as={Flex}
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={3}
          borderRadius="md"
          bgColor="secondary.100"
          color="white"
          fontWeight={600}
          onClick={() => handleTeamClick(id)}
        >
          {`Team ${i + 1}: ${name}`}
          <CheckCircleIcon />
        </Text>
      ))}
      <PrimaryButton onClick={handleEndRound} isDisabled={!canEndRound}>
        End round
      </PrimaryButton>
    </>
  );
};

TeamsOverview.getLayout = function getLayout(pageContent: ReactElement) {
  return (
    <AdminQuizControlContextWrapper>
      <AdminGameControlWrapper>{pageContent}</AdminGameControlWrapper>
    </AdminQuizControlContextWrapper>
  );
};

export default TeamsOverview;
