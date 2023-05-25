import { ReactNode } from 'react';
import QuizHead from '../headers/quiz-head';
import { Wrapper } from './wrapper';
import type { Props as WrapperProps } from './wrapper';
import RoundHead from '../headers/round-head';

interface Props extends WrapperProps {
  children: ReactNode;
}

export default function InQuizWrapper({ children, ...props }: Props) {
  return (
    <Wrapper spacing={10} {...props}>
      <QuizHead />
      <RoundHead />
      {children}
    </Wrapper>
  );
}
