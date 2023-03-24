import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Heading, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import SecondaryButton from '../../../../components/buttons/secondary-button';
import SubHeader from '../../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../../components/wrappers/admin-creator-wrapper';
import useCreatorStorage from '../../../../hooks/use-creator-storage';

const CreateNewQuiz = () => {
  const router = useRouter();

  const { initialData, setData } = useCreatorStorage();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    setName(initialData.name ?? '');
    setPassword(initialData.password ?? '');
    setPin(initialData.pin ?? '');
  }, []);

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
    setData({
      ...initialData,
      name,
      password,
      pin,
    });
  };

  const handleNext = () => {
    onNavigate();
    router.push('create-new-quiz/rounds');
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
      <Flex gap={2} mt="auto" alignSelf="end">
        <SecondaryButton
          borderColor="secondary.100"
          color="secondary.100"
          rightIcon={<ArrowForwardIcon />}
          onClick={handleNext}
        >
          Next step
        </SecondaryButton>
      </Flex>
    </Flex>
  );
};

CreateNewQuiz.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <AdminCreatorWrapper minHeight="100vh">{pageContent}</AdminCreatorWrapper>
  );
};

export default CreateNewQuiz;
