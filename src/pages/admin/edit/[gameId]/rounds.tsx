import { Flex, Heading } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { ADMIN_EDIT_ROUTE_LIST } from '../../../../../constants';
import { StoreQuiz } from '../../../../../types';
import AdminQuizManageRoundsForm from '../../../../components/admin-quiz-manage/rounds-form';
import { useAdminQuizManage } from '../../../../components/contexts/admin-quiz-manage-context';
import SubHeader from '../../../../components/headers/sub-header';
import RouteNavigation from '../../../../components/route-navigation';
import { AdminEditorWrapper } from '../../../../components/wrappers/admin-editor-wrapper';

const QuizEditRounds = () => {
  const { quizData, setQuizData } = useAdminQuizManage();

  const handleQuizDataChange = (quizData: StoreQuiz) => {
    setQuizData(quizData);
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Editing a quiz
      </Heading>
      <SubHeader>Rounds</SubHeader>
      <AdminQuizManageRoundsForm
        quizData={quizData}
        onQuizDataChange={handleQuizDataChange}
      />
      <RouteNavigation routeList={ADMIN_EDIT_ROUTE_LIST} />
    </Flex>
  );
};

QuizEditRounds.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminEditorWrapper>{pageContent}</AdminEditorWrapper>;
};

export default QuizEditRounds;
