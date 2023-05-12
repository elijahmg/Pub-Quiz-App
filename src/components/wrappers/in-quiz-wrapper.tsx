import { ReactNode } from 'react';
import QuizHead from '../headers/quiz-head';
import { TEAM_NAME } from '../../../mock-data';
import { Wrapper } from './wrapper';
import type { Props as WrapperProps } from './wrapper';
import RoundHead from '../headers/round-head';

interface Props extends WrapperProps {
  children: ReactNode;
}

export default function InQuizWrapper({ children, ...props }: Props) {
  return (
    <Wrapper m={8} {...props}>
      <QuizHead teamName={TEAM_NAME} round="1" />
      <RoundHead />
      {children}
    </Wrapper>
  );
}
