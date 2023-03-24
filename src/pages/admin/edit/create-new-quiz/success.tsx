import { Center, Flex, Text } from '@chakra-ui/react';
import { AdminCreatorWrapper } from '../../../../components/wrappers/admin-creator-wrapper';
import { useRouter } from 'next/router';
import Header from '../../../../components/headers/header';
import SecondaryButton from '../../../../components/buttons/secondary-button';

const Success = () => {
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

Success.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <AdminCreatorWrapper minHeight="100vh">{pageContent}</AdminCreatorWrapper>
  );
};

export default Success;
