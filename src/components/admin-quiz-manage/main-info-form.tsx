import { Flex, FlexProps, Input, Text } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { StoreQuiz } from '../../../types';

interface Props extends FlexProps {
  quizData: StoreQuiz;
  onQuizDataChange: (quizData: StoreQuiz) => void;
}

export default function AdminQuizManageMainInfoForm({
  quizData,
  onQuizDataChange,
  ...props
}: Props) {
  const { name, password, pin } = quizData;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuizDataChange({ ...quizData, name: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuizDataChange({ ...quizData, password: e.target.value });
  };

  const handlePinChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuizDataChange({ ...quizData, pin: e.target.value });
  };

  return (
    <Flex direction="column" gap={4} {...props}>
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
    </Flex>
  );
}
