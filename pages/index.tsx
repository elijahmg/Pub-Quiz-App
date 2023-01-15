import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/headers/Header';
import SubHeader from '../components/headers/SubHeader';
import SubTitle from '../components/headers/SubTitle';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import ModalComponent from '../components/ModalComponent';
import { useRouter } from 'next/router';
import DummyPeople from '../components/images/dummy-people';
import * as React from 'react';
import { MainPageWrapper } from '../components/main-page-wrapper';

export default function Home() {
  const [modalStatus, changeModalStatus] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainPageWrapper>
        <Box mb={14}>
          <Flex alignItems="center" flexDirection="column" textAlign="center">
            <Header>Hello there</Header>
            <Box my={10}>
              <DummyPeople />
            </Box>
            <SubHeader size="lg" mb="4">
              Looks like you’re ready to have a great time.
            </SubHeader>
            <SubTitle>
              Time to enter your quiz’s PIN and let’s get started.
            </SubTitle>
          </Flex>
        </Box>
        <PrimaryButton onClick={() => router.push('add-pin')} w="100%" mb={2}>
          Enter PIN
        </PrimaryButton>
        <SecondaryButton w="100%">Admin dashboard</SecondaryButton>
        <ModalComponent
          modalStatus={modalStatus}
          onClickHandle={changeModalStatus}
        />
      </MainPageWrapper>
    </>
  );
}
