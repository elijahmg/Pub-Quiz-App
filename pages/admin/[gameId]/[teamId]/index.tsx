import {
  Button,
  Stack,
  Text,
  Radio,
  RadioGroup,
  Heading,
} from '@chakra-ui/react';
import { Question, Team, TeamAnswers } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { useState } from 'react';
import { prisma } from '../../../../common/prisma-client';
import TeamName from '../../../../components/TeamName';
import { QuestionWithTeamAnswer } from '../../../../types/main';

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
  questions: QuestionWithTeamAnswer[];
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
            <Heading as="h3" size="2xl">
              Question {id}:
            </Heading>
            <Text>{content}.</Text>
            <Heading as="h3" size="2xl">
              Answer:{' '}
            </Heading>
            <Text>{teamAnswers[0].answer}</Text>
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
          teamAnswers: {
            where: {
              teamId: Number(teamId),
            },
          },
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
