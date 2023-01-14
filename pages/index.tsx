import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Header from '../components/headers/Header';
import SubHeader from '../components/headers/SubHeader';
import SubTitle from '../components/headers/SubTitle';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import ModalComponent from '../components/ModalComponent';
export default function Home() {
  const [modalStatus, changeModalStatus] = useState<boolean>(false);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <Box mb={98}>
          <Flex alignItems="center" flexDirection="column">
            <Header label={'Hello there'} />
            <SubHeader
              label={'Looks like you’re ready to have a great time.'}
            />
            <SubTitle
              label={'Time to enter your quiz’s PIN and let’s get started.'}
            />
          </Flex>
        </Box>

        <PrimaryButton
          label={'Enter PIN'}
          changeModalStatus={changeModalStatus}
        />
        <SecondaryButton label={'Admin dashboard'} />
        <ModalComponent
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />
      </main>
    </>
  );
}
