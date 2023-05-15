import { useEffect, useState } from 'react';
import Question from '../../components/question';
import { QUESTIONS } from '../../../mock-data';
import InQuizWrapper from '../../components/wrappers/in-quiz-wrapper';
import { useRouter } from 'next/router';
import { Stack } from '@chakra-ui/react';
import PrimaryButton from '../../components/buttons/primary-button';

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
    // TODO Replace mock data
    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex((curr) => curr + 1);
    } else {
      router.push({ pathname: 'questions-overview', query: router.query });
    }
  };

  return (
    <Stack spacing={2}>
      <Question
        // TODO Replace mock data
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
  return <InQuizWrapper>{pageContent}</InQuizWrapper>;
};

export default Play;
