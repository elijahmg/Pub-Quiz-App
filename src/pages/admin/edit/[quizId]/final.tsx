import { ArrowBackIcon } from '@chakra-ui/icons';
import { Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import AdminQuizManageFinalOverview from '../../../../components/admin-quiz-manage/final-overview';
import PrimaryButton from '../../../../components/buttons/primary-button';
import SecondaryButton from '../../../../components/buttons/secondary-button';
import { useAdminQuizManageContext } from '../../../../components/contexts/admin-quiz-manage-context';
import SubHeader from '../../../../components/headers/sub-header';
import { AdminEditorWrapper } from '../../../../components/wrappers/admin-editor-wrapper';

const QuizEditFinal = () => {
  const router = useRouter();

  const { quizData } = useAdminQuizManageContext();

  const handlePrevious = () => {
    router.push({ pathname: 'questions', query: router.query });
  };

  const handleCreate = () => {
    router.push({ pathname: 'success', query: router.query });
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Editing a quiz
      </Heading>
      <SubHeader>Final check</SubHeader>
      <AdminQuizManageFinalOverview quizData={quizData} />
      <Flex gap={2} mt="auto" alignSelf="end">
        <SecondaryButton
          testId="FinalPreviousStep_Button"
          borderColor="secondary.100"
          color="secondary.100"
          leftIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
        >
          Previous step
        </SecondaryButton>
        <PrimaryButton testId="FinalSaveChanges_Button" onClick={handleCreate}>
          Save changes
        </PrimaryButton>
      </Flex>
    </Flex>
  );
};

QuizEditFinal.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminEditorWrapper>{pageContent}</AdminEditorWrapper>;
};

export default QuizEditFinal;
