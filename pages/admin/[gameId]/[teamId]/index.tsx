import {
  Button,
  Stack,
  Heading,
  Text,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { Question, Team, TeamAnswers } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { useState } from 'react';
import { prisma } from '../../../../common/prisma-client';
import TeamName from '../../../../components/TeamName';

type QuestionResultList = Record<Question['id'], number>;

function RadioComponent(props: {
  questionIndex: number;
  results: QuestionResultList;
  onChange: (v: string, idx: number) => void;
}) {
  return (
    <RadioGroup
      value={String(props.results[props.questionIndex])}
      onChange={(value) => props.onChange(value, props.questionIndex)}
    >
      <Stack>
        <Radio value="1">1</Radio>
        <Radio value="0.5">0.5</Radio>
        <Radio value="0">0</Radio>
      </Stack>
    </RadioGroup>
  );
}

export default function AnswersCheck({
  team,
  answers,
  questions,
}: {
  team: Team;
  answers: TeamAnswers[];
  questions: Question[];
}) {
  const [sum, setSum] = useState(0);
  const [results, setResults] = useState(() =>
    questions.reduce((acc, question) => {
      acc[question.id] = 0;
      return acc;
    }, {} as QuestionResultList),
  );

  const updatePoints = (value: string, questionIndex: Question['id']) => {
    results[questionIndex] = Number(value);
    setResults(results);
    const updatedSum = Object.values(results).reduce(
      (a: number, b: number): number => a + b,
      0,
    );
    setSum(updatedSum as number);
  };

  return (
    <Stack>
      <Stack>
        <TeamName name={team.name} />
        {questions.map(({ content, id, teamAnswers }) => (
          <React.Fragment key={id}>
            <Text>
              Question {id}: {content}. Answer:{' '}
              {teamAnswers?.find(
                ({ teamId }: TeamAnswers) => teamId === team.id,
              ) ?? ''}
            </Text>
            <RadioComponent
              questionIndex={id}
              onChange={updatePoints}
              results={results}
            />
          </React.Fragment>
        ))}
        <Text>Total {sum}</Text>
      </Stack>
      <Button>Back to Overview</Button>
      <Button>Next team</Button>
    </Stack>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { gameId, teamId } = context.query;
  const game = await prisma.game.findUnique({
    include: {
      topics: {
        include: {
          questions: {
            include: {
              teamAnswers: true,
            },
          },
          teamAnswers: true,
        },
      },
      teams: {
        where: {
          id: Number(teamId),
        },
      },
    },
    where: {
      id: Number(gameId),
    },
  });

  return {
    props: {
      team: game?.teams?.[0],
      answers:
        game?.topics?.reduce(
          (acc: TeamAnswers[], { teamAnswers = [] }) => [
            ...acc,
            ...teamAnswers,
          ],
          [] as TeamAnswers[],
        ) ?? [],
      questions:
        game?.topics?.reduce(
          (acc, { questions }) => [...acc, ...questions],
          [] as Question[],
        ) ?? [],
    },
  };
}
