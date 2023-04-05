import { useEffect, useState } from 'react';
import Question from '../../components/question';
import { QUESTIONS } from '../../../mock-data';
import InGameWrapper from '../../components/wrappers/in-game-wrapper';
import PrimaryButton from '../../components/buttons/primary-button';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Play = () => {
  const router = useRouter();

  const [questionIndex, setQuestionIndex] = useState(0);

  const [answer, setAnswer] = useState('');

  const handleAnswerChange = (answer: string) => {
    setAnswer(answer);
  };

  useEffect(() => {
    setAnswer('');
  }, [questionIndex]);

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

  const handleSubmit = () => {
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex((curr) => curr + 1);
    } else {
      router.push({ pathname: 'questions-overview', query: router.query });
    }
  };

  return (
    <Stack spacing={2}>
      <Question
        question={QUESTIONS[questionIndex]}
        questionIndex={questionIndex}
        answer={answer}
        onAnswerChange={handleAnswerChange}
      />
      <PrimaryButton onClick={handleSubmit}>Submit</PrimaryButton>
    </Stack>
  );
};

Play.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <InGameWrapper>{pageContent}</InGameWrapper>;
};

export default Play;
