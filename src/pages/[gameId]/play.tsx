import { Stack } from '@chakra-ui/react';
import { useState } from 'react';
import Question from '../../components/question';
import { STACK_SPACING } from '../../../constants';
import { QUESTIONS } from '../../../mock-data';
import { SecondaryWrapper } from '../../components/wrappers/secondary-wrapper';

// @TODO Fix typing
const Play = ({ channel }: { channel: any }) => {
  const [stateIndex, setStateIndex] = useState<number>(0);
  const userName = 'John Doe';
  const round = {
    id: 1,
    name: 'Music',
    questions: QUESTIONS,
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
    <Stack mt={10} spacing={STACK_SPACING}>
      <Question
        question={`Q${stateIndex + 1}: ${round.questions[stateIndex].content}`}
        handleAnswer={console.log}
      />
    </Stack>
  );
};

Play.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <SecondaryWrapper>{pageContent}</SecondaryWrapper>;
};

export default Play;
