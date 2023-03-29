import { Flex, Heading, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, ReactElement, useState } from 'react';
import RouteNavigation from '../../../components/route-navigation';
import SubHeader from '../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../../constants';
import { useAdminCreator } from '../../../components/contexts/admin-creator-context';

const CreateNewQuiz = () => {
  const { quizData, setQuizData } = useAdminCreator();

  const [name, setName] = useState(quizData.name);
  const [password, setPassword] = useState(quizData.password);
  const [pin, setPin] = useState(quizData.pin);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const onNavigate = () => {
    // @FIXME The data has to be stored at different times. Maybe on unmount?
    setQuizData({
      ...quizData,
      name,
      password,
      pin,
    });
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Main info</SubHeader>
      <Text>Please name your quiz</Text>
      <Input
        value={name}
        placeholder="E.g.: I hate Mondays"
        onChange={handleNameChange}
      />
      <Text>Add the password</Text>
      <Input
        value={password}
        placeholder="E.g.: AmazingQuiz1!"
        onChange={handlePasswordChange}
      />
      <Text>Add the PIN</Text>
      <Input
        value={pin}
        placeholder="E.g.: 123456"
        onChange={handlePinChange}
      />
      <RouteNavigation
        routeList={ADMIN_CREATE_ROUTE_LIST}
        onNavigate={onNavigate}
      />
    </Flex>
  );
};

CreateNewQuiz.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default CreateNewQuiz;
