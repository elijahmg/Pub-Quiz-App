import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import QuizHead from '../headers/QuizHead';

interface Props {
  children: ReactNode;
}

export function SecondaryWrapper({ children }: Props) {
  return (
    <Flex flexDirection="column" m={8}>
      <QuizHead
        teamName="Quirky Owls"
        round="1"
        topicName="Round 1: Capitals of the world"
      />
      {children}
    </Flex>
  );
}
