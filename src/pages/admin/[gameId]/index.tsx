import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { STACK_SPACING } from '../../../../constants';
import PrimaryButton from '../../../components/buttons/primary-button';
import SecondaryButton from '../../../components/buttons/secondary-button';
import { AdminQuizControlContextWrapper } from '../../../components/contexts/admin-quiz-control-context';
import Astronaut from '../../../components/images/astronaut';
import Blobs2 from '../../../components/images/blobs-2';
import AdminQuizWrapper from '../../../components/wrappers/admin-quiz-wrapper';
import { useQuizDataStore } from '../../../state/quiz-data.state';
import { trpc } from '../../../utils/trcp';
import { GameStatuses } from '../../../server/types';

const AdminQuiz = () => {
  const { gameStatusId, id: quizId } = useQuizDataStore(
    (state) => state.quizData,
  );

  const { mutate: updateGameStatus } = trpc.admin.updateGameStatus.useMutation({
    onSuccess: () => handOnSuccessfullyUpdatedGameStatus(),
  });

  const router = useRouter();

  const handleStartQuiz = async () => {
    // @TODO better handling
    if (!gameStatusId) {
      return;
    }

    await updateGameStatus({
      id: gameStatusId,
      gameStatus: GameStatuses.PLAYING,
    });
  };

  const handOnSuccessfullyUpdatedGameStatus = () => {
    router.push(`/admin/${quizId}/game-control`);
  };

  const handleEditQuiz = () => {
    router.push(`/admin/edit/${quizId}`);
  };

  const handleDeleteQuiz = () => {
    console.log('delete quiz');
  };

  return (
    <Stack spacing={STACK_SPACING} alignItems="center" justifyContent="start">
      <Astronaut />
      <Stack spacing={STACK_SPACING}>
        <PrimaryButton size="lg" px={16} py={10} onClick={handleStartQuiz}>
          Start QUIZ
        </PrimaryButton>
        <SecondaryButton
          color="secondary.100"
          borderColor="secondary.100"
          leftIcon={<EditIcon />}
          onClick={handleEditQuiz}
        >
          Edit Quiz
        </SecondaryButton>
        <Button
          color="#E53E3E"
          bgColor="rgba(229, 62, 62, 0.1)"
          leftIcon={<DeleteIcon />}
          onClick={handleDeleteQuiz}
        >
          Delete Quiz
        </Button>
      </Stack>
    </Stack>
  );
};

AdminQuiz.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <AdminQuizControlContextWrapper>
      <Blobs2 position="absolute" top={0} zIndex={-1} />
      <AdminQuizWrapper>{pageContent}</AdminQuizWrapper>
    </AdminQuizControlContextWrapper>
  );
};

export default AdminQuiz;
