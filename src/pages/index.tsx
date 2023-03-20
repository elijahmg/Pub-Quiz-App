import Head from 'next/head';
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import Header from '../components/headers/header';
import SubHeader from '../components/headers/sub-header';
import SubTitle from '../components/headers/sub-title';
import PrimaryButton from '../components/buttons/primary-button';
import SecondaryButton from '../components/buttons/secondary-button';
import { useRouter } from 'next/router';
import DummyPeople from '../components/images/dummy-people';
import * as React from 'react';
import { MainPageWrapper } from '../components/wrappers/main-page-wrapper';
import { trpc } from '../utils/trcp';

export default function Home() {
  // This is just an example how to call tRPC
  // if you need lazily call the query set enabled to false
  // and use refetch function
  // const { data, refetch } = trpc.hello.useQuery(
  //   { text: 'Gww' },
  //   { enabled: false },
  // );
  const { mutate: createQuiz, data: quizData } =
    trpc.admin.createQuiz.useMutation();

  const { mutate: createTopic, data: topicData } =
    trpc.admin.createTopic.useMutation();

  const router = useRouter();

  async function handleCreateTopic() {
    // const res = createQuiz({
    //   name: 'Pub first',
    //   pin: '1111',
    //   password: '1222',
    // });

    createTopic({
      name: 'Movies',
      gameId: 1,
    });
  }

  return (
    <>
      <MainPageWrapper minHeight="100vh" justifyContent="center">
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
          alignItems="center"
          justifyContent="center"
          gap={8}
        >
          <GridItem area="header">
            <Header>Hello there! 👋</Header>
          </GridItem>
          <GridItem
            area="image"
            justifySelf="center"
            alignSelf="stretch"
            my={{ base: 10, md: 0 }}
          >
            <DummyPeople height={{ md: '100%' }} />
          </GridItem>
          <GridItem area="text">
            <SubHeader size="lg" mb="4">
              Looks like you’re ready to have a great time.
            </SubHeader>
            <SubTitle>
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
            <PrimaryButton onClick={() => router.push('add-pin')}>
              Enter PIN
            </PrimaryButton>
            <SecondaryButton onClick={() => router.push('admin')}>
              ADMIN dashboard
            </SecondaryButton>
          </GridItem>
        </Grid>
      </MainPageWrapper>
    </>
  );
}
