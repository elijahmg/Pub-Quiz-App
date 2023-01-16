import { Heading } from '@chakra-ui/react';
import { TeamAnswers } from '@prisma/client';

export default function Score({ teamAnswers }: { teamAnswers: TeamAnswers[] }) {
  function calculateSum(answers: TeamAnswers[]) {
    return answers.reduce(
      (accumulator, answer) => accumulator + Number(answer.score ?? 0),
      0,
    );
  }
  return <Heading size={'md'}>Total: {calculateSum(teamAnswers)}</Heading>;
}
