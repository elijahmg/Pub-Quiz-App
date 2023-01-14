import { Progress, Center, Stack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import * as QuestionComponent from '../../../components/Question';
import TeamName from '../../../components/TeamName';
import Constants from '../../../common/constants';
import { prisma } from '../../../common/prisma-client';
import { GameWithTopics, Question } from '../../../types/main';
import { GetServerSidePropsContext } from 'next';

function Play({
  question,
  questions,
}: {
  game: GameWithTopics;
  teamId: number;
  questions: number[];
  question: Question;
}) {
  const userDidAnswer = useCallback(
    (answer: string) => {
      // Send answer
    },
    [questions],
  );

  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <TeamName name="Dummy Team" />

        <QuestionComponent.default
          question={question.content}
          handleAnswer={userDidAnswer}
        />

        <Progress
          size="lg"
          value={Math.ceil(
            (questions.findIndex((id) => id === question.id) + 1) /
              (questions.length ?? 1),
          )}
        />
      </Stack>
    </Center>
  );
}

export default Play;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { gameId, teamId, questionId } = context.query;
  const [question, game] = await Promise.all([
    prisma.question.findUnique({
      where: {
        id: Number(questionId),
      },
    }),
    prisma.game.findUnique({
      where: {
        id: Number(gameId),
      },
      include: {
        topics: true,
      },
    }),
  ]);

  const topics = await prisma.topic.findMany({
    include: {
      questions: true,
    },
    where: {
      id: { in: game?.topics.map(({ id }) => id) ?? [] },
    },
  });

  return {
    props: {
      gameId,
      game,
      question,
      questions: topics.reduce(
        (acc, { questions }) => [
          ...acc,
          ...questions.map((q) => ({
            ...q,
            answer: '',
          })),
        ],
        [] as Question[],
      ),
      teamId,
    },
  };
}
