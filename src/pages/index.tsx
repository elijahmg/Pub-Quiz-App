import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import Header from '../components/headers/header';
import SubHeader from '../components/headers/sub-header';
import SubTitle from '../components/headers/sub-title';
import PrimaryButton from '../components/buttons/primary-button';
import SecondaryButton from '../components/buttons/secondary-button';
import DummyPeople from '../components/images/dummy-people';
import * as React from 'react';
import { MainPageWrapper } from '../components/wrappers/main-page-wrapper';
import { NextPageWithLayout } from '../../types';
import { useRouter } from 'next/router';

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Grid
      templateAreas={{
        base: `
          "header header"
          "image image"
          "text text"
          "buttons buttons"
        `,
        md: `
          "header image"
          "text image"
          "buttons image"
        `,
      }}
      gridTemplateColumns="repeat(2, 1fr)"
      gap={8}
    >
      <GridItem area="header">
        <Header textAlign={{ base: 'center', md: 'left' }} whiteSpace="nowrap">
          Hello there! 👋
        </Header>
      </GridItem>
      <GridItem
        area="image"
        justifySelf="center"
        alignSelf="stretch"
        my={{ base: 10, md: 0 }}
      >
        <DummyPeople
          height={{ sm: 'auto', md: '100%' }}
          width={{ sm: '100%', md: 'auto' }}
        />
      </GridItem>
      <GridItem area="text" as={Stack} spacing={2}>
        <SubHeader size="lg" textAlign={{ base: 'center', md: 'left' }}>
          Looks like you’re ready to have a great time.
        </SubHeader>
        <SubTitle textAlign={{ base: 'center', md: 'left' }}>
          Time to enter your quiz’s PIN and let’s get started.
        </SubTitle>
      </GridItem>
      <GridItem
        area="buttons"
        as={Flex}
        flexDirection={{ base: 'column', md: 'row' }}
        gap={2}
        mt={{ base: 14, md: 0 }}
      >
        <PrimaryButton onClick={() => router.push('pin')}>
          Enter PIN
        </PrimaryButton>
        <SecondaryButton onClick={() => router.push('admin')}>
          ADMIN dashboard
        </SecondaryButton>
      </GridItem>
    </Grid>
  );
};

Home.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <MainPageWrapper minHeight="100vh">{pageContent}</MainPageWrapper>;
};

export default Home;
