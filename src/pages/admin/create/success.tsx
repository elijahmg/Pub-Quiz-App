import { Center, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import SecondaryButton from '../../../components/buttons/secondary-button';
import Header from '../../../components/headers/header';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';

const QuizCreateSuccess = () => {
  const router = useRouter();

  const handleEdit = () => {
    router.push('edit/3');
  };

  const handleGoToHomepage = () => {
    router.push('/');
  };

  return (
    <Center flexDirection="column" justifyContent="start" gap={4} flexGrow={1}>
      <Header>Congratulations!</Header>
      <Text>You’ve created this amazing quiz, good job.</Text>
      <Text>You can always edit it or create a new one. Have fun!</Text>
      <Flex gap={2}>
        <SecondaryButton
          borderColor="secondary.100"
          color="secondary.100"
          onClick={handleEdit}
        >
          Edit current quiz
        </SecondaryButton>
        <SecondaryButton
          borderColor="secondary.100"
          color="secondary.100"
          onClick={handleGoToHomepage}
        >
          Go to homepage
        </SecondaryButton>
      </Flex>
    </Center>
  );
};

QuizCreateSuccess.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default QuizCreateSuccess;
