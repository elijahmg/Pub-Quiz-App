import React, { useState, useEffect } from 'react';
import { PinInput, HStack, PinInputField, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MainPageWrapper } from '../components/wrappers/main-page-wrapper';
import { PIN_LENGTH } from '../../constants';
import { QUIZ } from '../../mock-data';
import { useUserStore } from '../components/stores/user-store';

const InputPin = () => {
  const router = useRouter();

  const userStore = useUserStore(({ setQuiz }) => ({ setQuiz }));

  const [pin, setPin] = useState('');

  // const { data } = trpc.team.joinWithPin.useQuery(
  //   { pin },
  //   {
  //     enabled: pin.length === 4,
  //   },
  // );

  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      userStore.setQuiz(QUIZ);
      router.push({ pathname: '[gameId]', query: { gameId: QUIZ.id } });
    }
  }, [pin.length, router]);

  function handlePin(pin: string) {
    setPin(pin);
  }

  return (
    <Center as={HStack}>
      <PinInput type="number" onChange={handlePin} size="lg">
        {new Array(PIN_LENGTH).fill(undefined).map((_, i) => (
          <PinInputField key={i} />
        ))}
      </PinInput>
    </Center>
  );
};

InputPin.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <MainPageWrapper header="Enter PIN" spacing={6}>
      {pageContent}
    </MainPageWrapper>
  );
};

export default InputPin;
