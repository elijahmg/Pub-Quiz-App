import { Flex, Grid, GridItem, Input, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PrimaryButton from '../../components/buttons/primary-button';
import SecondaryButton from '../../components/buttons/secondary-button';
import Header from '../../components/headers/header';
import SubTitle from '../../components/headers/sub-title';
import AdminWelcome from '../../components/images/admin-welcome';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import { ChangeEvent, useState } from 'react';
import {
  QuizData,
  useAdminQuizDataState,
} from '../../state/admin/admin-quiz-data.state';
import useResponseToast from '../../hooks/use-response-toast';
import { trpc } from '../../utils/trcp';
import { QuizStatusEnum } from '.prisma/client';

const AdminHome = () => {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const setQuizData = useAdminQuizDataState((state) => state.setQuizData);

  const { handleTRPCError } = useResponseToast();

  const { refetch: getQuizByPassword } = trpc.admin.getQuizByPassword.useQuery(
    {
      password,
    },
    {
      enabled: false,
      onSuccess: (quizData: QuizData) => handleOnGetQuizSuccessfully(quizData),
      onError: handleTRPCError,
    },
  );

  const handleOnGetQuizSuccessfully = (quizData: QuizData | null) => {
    if (quizData) {
      setQuizData(quizData);

      const path =
        quizData.quizStatus.status === QuizStatusEnum.PLAYING
          ? `admin/${quizData.id}/quiz-control`
          : `admin/${quizData.id}`;

      router.push(path);
    }
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Grid gap={8} gridTemplateColumns="repeat(2, 1fr)" alignItems="center">
      <GridItem as={Stack} spacing={8}>
        <Header>
          <Text as="span" color="secondary.100">
            Welcome to
          </Text>
          &nbsp;QWIZZ!
        </Header>
        <Stack spacing={4}>
          <SubTitle color="secondary.100" fontSize="xl">
            Looks like it might be time to create a new quiz, or maybe edit an
            existing one, it’s up to you.
          </SubTitle>
          <SubTitle color="secondary.100" fontSize="xl">
            Just have fun doing it!
          </SubTitle>
        </Stack>
        <Stack spacing={6} flex={1} maxW={600}>
          <Text color="secondary.100" whiteSpace="nowrap">
            You will need a password to go to the dashboard!
          </Text>
          <Input
            type="password"
            placeholder="Quiz password"
            value={password}
            onChange={handleChangePassword}
          />
          <Flex gap={2}>
            <SecondaryButton
              testId="AdminSubmitQuizPassword_Button"
              onClick={() => getQuizByPassword()}
              alignSelf="start"
              disabled={!password}
            >
              Go to quiz dashboard
            </SecondaryButton>
            <Text alignSelf="center">Or</Text>
            <PrimaryButton
              testId="AdminCreateQuiz_Button"
              onClick={() => router.push('admin/create')}
            >
              Create new quiz
            </PrimaryButton>
          </Flex>
        </Stack>
      </GridItem>
      <GridItem>
        <AdminWelcome width="auto" height="auto" />
      </GridItem>
    </Grid>
  );
};

AdminHome.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <MainPageWrapper minHeight="100vh" blobVariant={2}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default AdminHome;
