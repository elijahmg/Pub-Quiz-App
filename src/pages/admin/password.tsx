import { Flex, Input, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import PrimaryButton from '../../components/buttons/primary-button';
import SubHeader from '../../components/headers/sub-header';
import Password from '../../components/images/password';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';
import { trpc } from '../../utils/trcp';
import {
  QuizData,
  useAdminQuizDataState,
} from '../../state/admin/admin-quiz-data.state';
import useResponseToast from '../../hooks/use-response-toast';

const AdminHome = () => {
  const [password, setPassword] = useState('');
  const setQuizData = useAdminQuizDataState((state) => state.setQuizData);

  const router = useRouter();

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
      router.push(`${quizData.id}`);
    }
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Flex alignItems="center" gap={32}>
      <Stack spacing={8} flex={1} minW={300}>
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
      <Password height={{ md: '100%' }} width={{ md: 'auto' }} flex={1} />
    </Flex>
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
