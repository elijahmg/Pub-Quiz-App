import React, { useEffect, useState } from 'react';
import { PinInput, HStack, PinInputField, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MainPageWrapper } from '../components/wrappers/main-page-wrapper';
import { trpc } from '../utils/trcp';
import { QuizData, useQuizDataStore } from '../state/quiz-data.state';
import { PIN_LENGTH } from '../../constants';

const Pin = () => {
  const [pin, setPin] = useState('');
  const setQuizData = useQuizDataStore((state) => state.setQuizData);

  const router = useRouter();

  function onGettingQuizDataSuccessfully(quizData: QuizData) {
    setQuizData(quizData);

    router.push({
      pathname: '/[quizId]',
      query: { ...router.query, quizId: 1 },
    });
  }

  function handlePinChange(pin: string) {
    setPin(pin);
  }

  useEffect(() => {
    if (pin.length === PIN_LENGTH) {
      router.push({
        pathname: '/[quizId]',
        query: { ...router.query, quizId: 1 },
      });
    }

    trpc.team.getQuizByPin.useQuery(
      { pin },
      {
        enabled: pin.length === PIN_LENGTH,
        onSuccess: (quizData) => onGettingQuizDataSuccessfully(quizData),
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin.length]);

  return (
    <Center as={HStack}>
      <PinInput type="number" onChange={handlePinChange} size="lg">
        {new Array(PIN_LENGTH).fill(undefined).map((_, i) => (
          <PinInputField key={i} />
        ))}
      </PinInput>
    </Center>
  );
};

Pin.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <MainPageWrapper header="Enter PIN">{pageContent}</MainPageWrapper>;
};

export default Pin;