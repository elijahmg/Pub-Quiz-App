import { Progress, Center, Stack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import Question from '../../components/Question';
import Constants from '../../constants';
import { SecondaryWrapper } from '../../components/wrappers/secondary-wrapper';

function Play({ channel }: { channel: any }) {
  const [stateIndex, setStateIndex] = useState<number>(0);
  const userName = 'John Doe';
  const round = {
    id: 1,
    name: 'Music',
    questions: [
      {
        id: 1,
        content: 'Where is John',
        answer: 'here',
      },
    ],
  };
  // useEffect(() => {
  //   channel.subscribe((status: any) => {
  //     setStateIndex(Number(status));
  //   });
  //   return () => channel.unsubscribe();
  // }, [setStateIndex, channel]);

  // const userDidAnswer = useCallback(
  //   (answer: string) => {
  //     channel.send({
  //       question: round.questions[stateIndex],
  //       user: userName,
  //       answer,
  //     });
  //   },
  //   [channel, round.questions, stateIndex],
  // );

  return (
    <SecondaryWrapper>
      <Stack mt={10} spacing={Constants.StackSpacing}>
        <Question
          question={`Q1: ${round.questions[stateIndex].content}`}
          handleAnswer={console.log}
        />
      </Stack>
    </SecondaryWrapper>
  );
}

export default Play;
