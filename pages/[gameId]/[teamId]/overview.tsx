import { Center, Flex, Stack } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import * as QuestionComponent from '../../../components/Question';
import TeamName from '../../../components/TeamName';
import Constants from '../../../common/constants';
import { Question } from '@prisma/client';
import { prisma } from '../../../common/prisma-client';

export default function Overview({
  name,
  questions,
}: {
  name: string;
  questions?: Array<Question>;
}) {
  const [allQuestions, setAllQuestions] = useState(
    questions ?? ([] as Question[]),
  );

  const onHandleAnswer = useCallback(
    (answer: string, id: number) => {
      setAllQuestions((oldQuestions) =>
        oldQuestions.map((question) =>
          question.id === id ? { ...question, answer } : question,
        ),
      );
    },
    [setAllQuestions],
  );
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <Flex justifyContent="flex-start">
          <TeamName name={name} />
          <Stack>
            {allQuestions.map((question) => {
              return (
                <QuestionComponent.default
                  key={question.id}
                  question={question}
                  handleAnswer={onHandleAnswer}
                />
              );
            })}
          </Stack>
        </Flex>
      </Stack>
    </Center>
  );
}

export async function getServerSideProps(context: any) {
  const { gameId, teamId } = context.query;
  const [game, team] = await Promise.all([
    prisma.game.findUnique({
      where: {
        id: Number(gameId),
      },
      include: {
        topics: {
          include: {
            questions: {
              include: {
                teamAnswers: {
                  where: {
                    teamId: Number(teamId),
                  },
                },
              },
            },
          },
        },
      },
    }),
    prisma.team.findUnique({
      where: {
        id: Number(teamId),
      },
    }),
  ]);

  return {
    props: {
      gameId,
      name: team?.name ?? '',
      questions:
        game?.topics.reduce((acc, { questions }) => {
          return [...acc, ...questions];
        }, [] as Question[]) ?? [],
    },
  };
}
