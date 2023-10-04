import { Flex, Heading } from '@chakra-ui/react';
import { ReactElement } from 'react';
import SubHeader from '../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import RouteNavigation from '../../../components/route-navigation';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../../constants';
import { useAdminQuizManageContext } from '../../../components/contexts/admin-quiz-manage-context';
import AdminQuizManageQuestionsForm from '../../../components/admin-quiz-manage/questions-form';
import { StoreQuiz } from '../../../../types';

const QuizCreateQuestions = () => {
  const { quizData, setQuizData } = useAdminQuizManageContext();

  const handleQuizDataChange = (quizData: StoreQuiz) => {
    setQuizData(quizData);
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader testId="AdminCreateQuizQuestions_Header">Questions</SubHeader>
      <AdminQuizManageQuestionsForm
        quizData={quizData}
        onQuizDataChange={handleQuizDataChange}
      />
      <RouteNavigation routeList={ADMIN_CREATE_ROUTE_LIST} />
    </Flex>
  );
};

QuizCreateQuestions.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default QuizCreateQuestions;
