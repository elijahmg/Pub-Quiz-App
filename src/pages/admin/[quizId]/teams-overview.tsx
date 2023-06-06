import { CheckCircleIcon } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement, useMemo } from 'react';
import PrimaryButton from '../../../components/buttons/primary-button';
import { AdminQuizControlContextWrapper } from '../../../components/contexts/admin-quiz-control-context';
import AdminQuizControlWrapper from '../../../components/wrappers/admin-quiz-control-wrapper';
import { useAdminQuizDataState } from '../../../state/admin/admin-quiz-data.state';
import { trpc } from '../../../utils/trcp';

const TeamsOverview = () => {
  const router = useRouter();
  const { quizData } = useAdminQuizDataState((state) => ({
    quizData: state.quizData,
  }));

  const { data: teams, isLoading: isTeamsLoading } =
    trpc.admin.getTeamsByQuizId.useQuery(
      {
        quizId: quizData.id!,
      },
      {
        enabled: !!quizData.id,
      },
    );

  const handleTeamClick = (teamId: number) => {
    router.push({
      pathname: '/admin/[quizId]/[teamId]',
      query: { ...router.query, teamId },
    });
  };

  const handleEndRound = () => {
    router.push({
      pathname: '/admin/[quizId]/round-overview',
      query: { ...router.query },
    });
  };

  const canEndRound = useMemo(() => {
    return true;
  }, []);

  if (isTeamsLoading || !teams) return null;

  return (
    <>
      {teams.map(({ id, name }, i) => (
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
          {/** @TODO check circle must indicate if team has been scored **/}
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
      <AdminQuizControlWrapper>{pageContent}</AdminQuizControlWrapper>
    </AdminQuizControlContextWrapper>
  );
};

export default TeamsOverview;
