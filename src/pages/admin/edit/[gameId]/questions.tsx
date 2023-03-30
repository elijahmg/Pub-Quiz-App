import { Flex, Heading } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { ADMIN_EDIT_ROUTE_LIST } from '../../../../../constants';
import { StoreQuiz } from '../../../../../types';
import AdminQuizManageQuestionsForm from '../../../../components/admin-quiz-manage/questions-form';
import { useAdminQuizManageContext } from '../../../../components/contexts/admin-quiz-manage-context';
import SubHeader from '../../../../components/headers/sub-header';
import RouteNavigation from '../../../../components/route-navigation';
import { AdminEditorWrapper } from '../../../../components/wrappers/admin-editor-wrapper';

const QuizEditQuestions = () => {
  const { quizData, setQuizData } = useAdminQuizManageContext();

  const handleQuizDataChange = (quizData: StoreQuiz) => {
    setQuizData(quizData);
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Editing a quiz
      </Heading>
      <SubHeader>Questions</SubHeader>
      <AdminQuizManageQuestionsForm
        quizData={quizData}
        onQuizDataChange={handleQuizDataChange}
      />
      <RouteNavigation routeList={ADMIN_EDIT_ROUTE_LIST} />
    </Flex>
  );
};

QuizEditQuestions.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminEditorWrapper>{pageContent}</AdminEditorWrapper>;
};

export default QuizEditQuestions;
