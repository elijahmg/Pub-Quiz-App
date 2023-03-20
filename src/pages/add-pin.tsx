import React, { useState, useEffect } from 'react';
import { PinInput, HStack, PinInputField, Center } from '@chakra-ui/react';
import Header from '../components/headers/header';
import { useRouter } from 'next/router';
import { MainPageWrapper } from '../components/wrappers/main-page-wrapper';
import { trpc } from '../utils/trcp';

export default function InputPin() {
  const [pin, setPin] = useState('');
  const router = useRouter();

  const { data } = trpc.team.joinWithPin.useQuery(
    { pin },
    {
      enabled: pin.length === 4,
    },
  );

  useEffect(() => {
    console.log({ data, pin });
  }, [data]);

  function handlePin(pin: string) {
    setPin(pin);
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
