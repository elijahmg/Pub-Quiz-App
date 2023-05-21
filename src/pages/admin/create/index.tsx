import { Flex, Heading, useToast } from '@chakra-ui/react';
import { ReactElement } from 'react';
import RouteNavigation from '../../../components/route-navigation';
import SubHeader from '../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../../constants';
import { useAdminQuizManageContext } from '../../../components/contexts/admin-quiz-manage-context';
import AdminQuizManageMainInfoForm from '../../../components/admin-quiz-manage/main-info-form';
import { StoreQuiz } from '../../../../types';
import { useFormikContext } from 'formik';

const QuizCreate = () => {
  const { quizData, setQuizData } = useAdminQuizManageContext();

  const toast = useToast();

  const { validateForm, handleSubmit } = useFormikContext();

  const handleQuizDataChange = (quizData: StoreQuiz) => {
    setQuizData(quizData);
  };

  const handleNavigateNext = async () => {
    handleSubmit();
    const formErrors = await validateForm();
    const isFormValid = !Object.keys(formErrors).length;

    if (!isFormValid) {
      toast({
        title: 'Error',
        description: 'Some fields weren`t filled correctly.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
    }

    return isFormValid;
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Main info</SubHeader>
      <AdminQuizManageMainInfoForm
        quizData={quizData}
        onQuizDataChange={handleQuizDataChange}
      />
      <RouteNavigation
        routeList={ADMIN_CREATE_ROUTE_LIST}
        onNext={handleNavigateNext}
      />
    </Flex>
  );
};

QuizCreate.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default QuizCreate;
