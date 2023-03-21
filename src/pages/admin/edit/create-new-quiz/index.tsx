import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import SubHeader from '../../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../../components/wrappers/admin-creator-wrapper';

const CreateNewQuiz = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const handleNext = () => {
    console.log({ name, password, pin });
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
        <Button
          size="lg"
          variant="outline"
          borderColor="secondary.100"
          color="secondary.100"
          rightIcon={<ArrowForwardIcon />}
          onClick={handleNext}
        >
          Next step
        </Button>
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
