import { Flex, Heading } from '@chakra-ui/react';
import { ReactElement } from 'react';
import SubHeader from '../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import RouteNavigation from '../../../components/route-navigation';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../../constants';
import { StoreQuiz } from '../../../../types';
import { useAdminQuizManageContext } from '../../../components/contexts/admin-quiz-manage-context';
import AdminQuizManageRoundsForm from '../../../components/admin-quiz-manage/rounds-form';
import { useCreateQuizStore } from '../../../state/create-quiz.state';

const QuizCreateRounds = () => {
  const gameId = useCreateQuizStore((state) => state.gameId);
  console.log({ gameId });
  const { quizData, setQuizData } = useAdminQuizManageContext();

  const handleQuizDataChange = (quizData: StoreQuiz) => {
    setQuizData(quizData);
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Rounds</SubHeader>
      <AdminQuizManageRoundsForm
        quizData={quizData}
        onQuizDataChange={handleQuizDataChange}
      />
      <RouteNavigation routeList={ADMIN_CREATE_ROUTE_LIST} />
    </Flex>
  );
};

QuizCreateRounds.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default QuizCreateRounds;
