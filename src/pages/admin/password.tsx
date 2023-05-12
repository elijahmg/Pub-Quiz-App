import { Grid, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import PrimaryButton from '../../components/buttons/primary-button';
import SubHeader from '../../components/headers/sub-header';
import Password from '../../components/images/password';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import { trpc } from '../../utils/trcp';
import { Game } from '@prisma/client';

const AdminHome = () => {
  const [password, setPassword] = useState('');

  const router = useRouter();

  const { refetch: getQuizByPassword } = trpc.admin.getQuizByPassword.useQuery(
    {
      password,
    },
    {
      enabled: false,
      onSuccess: (quizData) => handleOnGetQuizSuccessfully(quizData),
    },
  );

  const handleOnGetQuizSuccessfully = (quizData: Game | null) => {
    if (quizData) {
      router.push(`${quizData.id}`);
    }
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Grid templateColumns="repeat(2, minmax(0, 1fr));" gap={32}>
      <Stack spacing={8}>
        <SubHeader color="secondary.100" whiteSpace="nowrap">
          Input quiz password
        </SubHeader>
        <Input
          placeholder="Type in the password"
          value={password}
          onChange={handleChangePassword}
        />
        <PrimaryButton onClick={() => getQuizByPassword()} alignSelf="start">
          Submit
        </PrimaryButton>
      </Stack>
      <Password height={{ md: '100%' }} width={{ md: 'auto' }} />
    </Grid>
  );
};

AdminHome.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <MainPageWrapper minHeight="100vh" blobVariant={2} px={32}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default AdminHome;
