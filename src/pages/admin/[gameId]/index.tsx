import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, Stack, Flex, Tag, Center, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { QUIZ } from '../../../../mock-data';
import PrimaryButton from '../../../components/buttons/primary-button';
import SecondaryButton from '../../../components/buttons/secondary-button';
import SubHeader from '../../../components/headers/sub-header';
import SubTitle from '../../../components/headers/sub-title';
import Astronaut from '../../../components/images/astronaut';
import { MainPageWrapper } from '../../../components/wrappers/main-page-wrapper';

const AdminQuiz = () => {
  const router = useRouter();

  const handleStartQuiz = () => {
    console.log('start quiz');
  };

  const handleEditQuiz = () => {
    router.push(`/admin/edit/${3}`);
  };

  const handleDeleteQuiz = () => {
    console.log('delete quiz');
  };

  return (
    <Stack px={48} spacing={8}>
      <Grid
        templateColumns="1fr auto"
        templateRows="1fr 1fr"
        alignItems="center"
      >
        <SubHeader>{QUIZ.name}</SubHeader>
        <Tag gridRow="span 2">{`Teams online: ${5}`}</Tag>
        <SubTitle>{`PIN: ${QUIZ.pin}`}</SubTitle>
      </Grid>
      <Stack alignSelf="center" alignItems="center" spacing={8}>
        <Astronaut />
        <Stack spacing={2}>
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
    </Stack>
  );
};

AdminQuiz.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <MainPageWrapper minHeight="100vh" blobVariant={2}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default AdminQuiz;
