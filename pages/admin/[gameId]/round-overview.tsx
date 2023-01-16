import { Button, Stack, Text, Box, Flex, Center } from '@chakra-ui/react';
import { Team, TeamAnswers } from '@prisma/client';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import constants from '../../../common/constants';
import { prisma } from '../../../common/prisma-client';
import createSupabaseClient from '../../../common/supabase-client';
import SubHeader from '../../../components/headers/SubHeader';
import {
  GameWithTopics,
  QuestionWithTeamAnswer,
  TopicWithQuestions,
} from '../../../types/main';

function AnswerWithScore({
  teamAnswer = { answer: '', score: 0 },
}: {
  teamAnswer?: Pick<TeamAnswers, 'answer' | 'score'>;
}) {
  return (
    <>
      <Text>{teamAnswer.answer}</Text>
      <Text>{teamAnswer.score}</Text>
    </>
  );
}

function TeamQuestions({
  answers,
  topics,
  teamId,
}: {
  answers: TeamAnswers[];
  topics: TopicWithQuestions[];
  teamId: number;
}) {
  return (
    <>
      {answers.map(({ questionId }) => (
        <Box key={questionId}>
          {topics.reduce((acc: JSX.Element[], { questions }) => {
            return [
              ...acc,
              ...(questions as QuestionWithTeamAnswer[]).map(
                ({ id, teamAnswers = [], content }) => {
                  if (id === questionId) {
                    return (
                      <Center key={teamId + '_' + questionId}>
                        <Stack spacing={constants.StackSpacing}>
                          <Text>{content}</Text>
                          <AnswerWithScore
                            teamAnswer={teamAnswers?.find(
                              ({ teamId: id }: TeamAnswers) => teamId === id,
                            )}
                          />
                        </Stack>
                      </Center>
                    );
                  }
                  return <></>;
                },
              ),
            ];
          }, [] as JSX.Element[])}
        </Box>
      ))}
    </>
  );
}

export default function RoundOverview({
  game,
}: {
  game: GameWithTopics & { teams: Array<Team & { answers: TeamAnswers[] }> };
}) {
  const router = useRouter();

  return (
    <Stack>
      <Flex justifyContent="flex-start">
        {game.teams.map(({ id, name, answers }) => (
          <Box key={id}>
            <SubHeader label={name} />
            <TeamQuestions answers={answers} teamId={id} topics={game.topics} />
          </Box>
        ))}
        )
      </Flex>
      {/** @TODO game id is dynamic **/}
      <Button onClick={() => router.push(`/admin/${game.id}/teams-check`)}>
        Check answers
      </Button>
    </Stack>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { gameId, id } = context.query;
  const client = createSupabaseClient();
  const game = await prisma.game.findUnique({
    where: {
      id: Number(gameId),
    },
    include: {
      teams: {
        include: {
          answers: true,
        },
      },
      topics: {
        include: {
          questions: true,
        },
      },
    },
  });
  return {
    props: {
      client,
      gameId,
      id,
      game,
    },
  };
}
