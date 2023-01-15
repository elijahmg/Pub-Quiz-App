import {
  PinInput,
  HStack,
  PinInputField,
  Flex,
  Center,
} from '@chakra-ui/react';
import Header from '../components/headers/Header';
import { useRouter } from 'next/router';
import React from 'react';
import { MainPageWrapper } from '../components/wrappers/main-page-wrapper';

export default function InputPin() {
  const router = useRouter();

  function handlePin(pin: string) {
    if (pin.length === 4) {
      router.push('/3');
    }
  }

  return (
    <MainPageWrapper>
      <Header alignSelf="center">Enter PIN</Header>
      <Center mt={8}>
        <HStack>
          <PinInput type="number" onChange={handlePin}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Center>
    </MainPageWrapper>
  );
}
