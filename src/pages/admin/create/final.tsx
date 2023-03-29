import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SubHeader from '../../../components/headers/sub-header';
import SecondaryButton from '../../../components/buttons/secondary-button';
import PrimaryButton from '../../../components/buttons/primary-button';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import { ReactElement } from 'react';
import { useAdminQuizManage } from '../../../components/contexts/admin-quiz-manage-context';
import AdminQuizManageFinalOverview from '../../../components/admin-quiz-manage/final-overview';

const QuizCreateFinal = () => {
  const router = useRouter();

  const { quizData } = useAdminQuizManage();

  const handlePrevious = () => {
    router.push('questions');
  };

  const handleCreate = () => {
    console.log(quizData);
    router.push('success');
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Final check & create</SubHeader>
      <AdminQuizManageFinalOverview quizData={quizData} />
      <Flex gap={2} mt="auto" alignSelf="end">
        <SecondaryButton
          borderColor="secondary.100"
          color="secondary.100"
          leftIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
        >
          Previous step
        </SecondaryButton>
        <PrimaryButton onClick={handleCreate}>Create quiz</PrimaryButton>
      </Flex>
    </Flex>
  );
};

QuizCreateFinal.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default QuizCreateFinal;
