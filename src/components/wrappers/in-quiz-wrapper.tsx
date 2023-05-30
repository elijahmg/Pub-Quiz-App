import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import QuizHead from '../headers/quiz-head';
import { Wrapper } from './wrapper';
import type { Props as WrapperProps } from './wrapper';
import { useTeamQuizDataStore } from '../../state/team/team-quiz-data.state';
import { trpc } from '../../utils/trcp';
import { QuizStatusEnum } from '.prisma/client';

interface Props extends WrapperProps {
  children: ReactNode;
  quizStatus?: QuizStatusEnum;
}

export default function InQuizWrapper({
  children,
  quizStatus,
  ...props
}: Props) {
  const router = useRouter();

  const { setQuizData, quizData } = useTeamQuizDataStore((state) => ({
    setQuizData: state.setQuizData,
    quizData: state.quizData,
  }));

  useEffect(() => {
    if (!quizData.pin) {
      router.push('/pin');
    }
  }, []);

  trpc.team.getQuizByPin.useQuery(
    {
      pin: quizData.pin!,
      quizStatus: quizStatus || QuizStatusEnum.PLAYING,
    },
    {
      enabled: !!quizData.pin,
      // @TODO here we can handle redirect to correct page
      // @TODO depending on quiz status
      onSuccess: (data) => setQuizData(data),
    },
  );

  return (
    <Wrapper spacing={10} {...props}>
      <QuizHead />
      {children}
    </Wrapper>
  );
}
