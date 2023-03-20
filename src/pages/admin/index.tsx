import { Flex, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PrimaryButton from '../../components/buttons/primary-button';
import SecondaryButton from '../../components/buttons/secondary-button';
import SubTitle from '../../components/headers/sub-title';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';

const AdminHome = () => {
  const router = useRouter();

  return (
    <Stack gap={4}>
      <SubTitle color="secondary.100" fontSize="xl">
        Looks like it might be time to create a new quiz, or maybe edit an
        existing one, it’s up to you.
      </SubTitle>
      <SubTitle color="secondary.100" fontSize="xl">
        Just have fun doing it!
      </SubTitle>

      <Flex gap={2}>
        <PrimaryButton
          onClick={() => router.push('admin/edit/create-new-quiz')}
        >
          Create new quiz
        </PrimaryButton>
        <SecondaryButton>Input quiz password</SecondaryButton>
      </Flex>
    </Stack>
  );
};

AdminHome.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <MainPageWrapper
      header={
        <>
          <Text as="span" color="secondary.100">
            Welcome to
          </Text>
          &nbsp;QWIZZ!
        </>
      }
    >
      {pageContent}
    </MainPageWrapper>
  );
};

export default AdminHome;
