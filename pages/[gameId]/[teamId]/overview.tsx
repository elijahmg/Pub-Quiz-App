import { Center, Flex, Stack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import * as QuestionComponent from '../../../components/Question';
import TeamName from '../../../components/TeamName';
import Constants from '../../../common/constants';
import { Question } from '../../../types/main';
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

  useEffect(() => {}, [allQuestions]);
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <Flex justifyContent="flex-start">
          <TeamName name="Dummy Team" />
          <Stack>
            {allQuestions.map(({ id, content }) => {
              return (
                <QuestionComponent.default
                  key={id}
                  question={content}
                  handleAnswer={(answer) => {
                    setAllQuestions(
                      allQuestions.map((question) =>
                        question.id === id ? { ...question, answer } : question,
                      ),
                    );
                  }}
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
  const [questions, game, teamName] = await Promise.all([
    prisma.question.findMany(),
    prisma.game.findUnique({
      where: {
        id: Number(gameId),
      },
    }),
    prisma.team.findUnique({
      where: {
        id: Number(teamId),
      },
    }),
  ]);

  console.log({
    gameId,
    name: teamName,
    questions,
  });
  // Pass data to the page via props
  return {
    props: {
      gameId,
      name: teamName,
      questions,
    },
  };
}
