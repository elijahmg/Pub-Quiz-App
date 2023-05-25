import { Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PrimaryButton from '../../components/buttons/primary-button';
import SecondaryButton from '../../components/buttons/secondary-button';
import Header from '../../components/headers/header';
import SubTitle from '../../components/headers/sub-title';
import AdminWelcome from '../../components/images/admin-welcome';
import { MainPageWrapper } from '../../components/wrappers/main-page-wrapper';

const AdminHome = () => {
  const router = useRouter();

  return (
    <Grid gap={8} gridTemplateColumns="repeat(2, 1fr)" alignItems="center">
      <GridItem as={Stack} spacing={8}>
        <Header>
          <Text as="span" color="secondary.100">
            Welcome to
          </Text>
          &nbsp;QWIZZ!
        </Header>
        <Stack spacing={4}>
          <SubTitle color="secondary.100" fontSize="xl">
            Looks like it might be time to create a new quiz, or maybe edit an
            existing one, it’s up to you.
          </SubTitle>
          <SubTitle color="secondary.100" fontSize="xl">
            Just have fun doing it!
          </SubTitle>
        </Stack>
        <Flex gap={2}>
          <PrimaryButton onClick={() => router.push('admin/create')}>
            Create new quiz
          </PrimaryButton>
          <SecondaryButton onClick={() => router.push('admin/add-password')}>
            Input quiz password
          </SecondaryButton>
        </Flex>
      </GridItem>
      <GridItem>
        <AdminWelcome width="auto" height="auto" />
      </GridItem>
    </Grid>
  );
};

AdminHome.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <MainPageWrapper minHeight="100vh" blobVariant={2}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default AdminHome;
