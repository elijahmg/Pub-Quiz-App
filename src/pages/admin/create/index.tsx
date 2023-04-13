import { Flex, Heading } from '@chakra-ui/react';
import { ReactElement, useEffect } from 'react';
import RouteNavigation from '../../../components/route-navigation';
import SubHeader from '../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../../constants';
import { useAdminQuizManageContext } from '../../../components/contexts/admin-quiz-manage-context';
import AdminQuizManageMainInfoForm from '../../../components/admin-quiz-manage/main-info-form';
import { StoreQuiz } from '../../../../types';
import { trpc } from '../../../utils/trcp';
import { useCreateQuizStore } from '../../../state/create-quiz.state';

const QuizCreate = () => {
  const setGameIdState = useCreateQuizStore((state) => state.setGameId);
  const { mutate, data, isSuccess } = trpc.admin.createQuiz.useMutation();

  const { quizData, setQuizData } = useAdminQuizManageContext();

  const handleQuizDataChange = (quizData: StoreQuiz) => {
    setQuizData(quizData);
  };

  useEffect(() => {
    const id = data?.id;

    if (id) {
      console.log('Setting id');
      setGameIdState(id);
    }
  }, [isSuccess]);

  const onNextStepHandler = async () => {
    await mutate({
      pin: quizData.pin,
      password: quizData.password,
      name: quizData.name,
    });
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
        onNextHandler={onNextStepHandler}
        routeList={ADMIN_CREATE_ROUTE_LIST}
      />
    </Flex>
  );
};

QuizCreate.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default QuizCreate;
