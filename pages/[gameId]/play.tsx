import { Progress, Center, Stack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import Question from '../../components/Question';
import TeamName from '../../components/TeamName';
import Constants from '../../constants';

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
  useEffect(() => {
    channel.subscribe((status: any) => {
      setStateIndex(Number(status));
    });
    return () => channel.unsubscribe();
  }, [setStateIndex, channel]);

  const userDidAnswer = useCallback(
    (answer: string) => {
      channel.send({
        question: round.questions[stateIndex],
        user: userName,
        answer,
      });
    },
    [channel, round.questions, stateIndex],
  );

  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <TeamName name="Dummy Team" />

        <Question
          question={round.questions[stateIndex].content}
          handleAnswer={userDidAnswer}
        />

        <Progress
          size="lg"
          value={Math.ceil((stateIndex + 1) / (round.questions.length ?? 1))}
        />
      </Stack>
    </Center>
  );
}

export default Play;
