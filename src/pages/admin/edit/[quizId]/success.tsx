import { Center, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import SecondaryButton from '../../../../components/buttons/secondary-button';
import Header from '../../../../components/headers/header';
import { AdminEditorWrapper } from '../../../../components/wrappers/admin-editor-wrapper';

const QuizEditSuccess = () => {
  const router = useRouter();

  const handleGoToHomepage = () => {
    router.push('/');
  };

  return (
    <Center flexDirection="column" justifyContent="start" gap={4} flexGrow={1}>
      <Header>Congratulations!</Header>
      <Text>You’ve edited the quiz.</Text>
      <Flex gap={2}>
        <SecondaryButton
          testId="Success_GoToHomepage_Button"
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

QuizEditSuccess.getLayout = function getLayout(
  pageContent: React.ReactElement,
) {
  return <AdminEditorWrapper>{pageContent}</AdminEditorWrapper>;
};

export default QuizEditSuccess;
