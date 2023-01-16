import { Progress, Center, Stack, useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import * as QuestionComponent from '../../../components/Question';
import TeamName from '../../../components/TeamName';
import Constants from '../../../common/constants';
import { prisma } from '../../../common/prisma-client';
import createSupabaseClient from '../../../common/supabase-client';
import { GameWithTopics, Question } from '../../../types/main';
import { GetServerSidePropsContext } from 'next';
import { SupabaseClient } from '@supabase/supabase-js';
import EditTopic from '../../admin/[gameId]/edit/topics/[id]';

function Play({
  question,
  questions,
  teamId,
  client,
  game,
}: {
  client: SupabaseClient;
  game: GameWithTopics;
  teamId: number;
  questions: number[];
  question: Question;
}) {
  const toast = useToast();

  const userDidAnswer = useCallback(
    async (answer: string) => {
      try {
        const response = await client.channel('question').send({
          type: 'Question',
          gameId: game.id,
          teamId,
          question: {
            ...question,
            teamAnswers: [
              {
                teamId,
                answer,
                questionId: question.id,
                topicId: question.topicId,
              },
            ],
          },
        });
        toast({
          title: 'You successfully respond to the question.',
          description:
            'You have successfully answered the question. Good luck!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } catch (e: any) {
        console.error(e);
        toast({
          title: 'Error while answering the question.',
          description:
            'The question could not be answered. Please try again later.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [question, game.id, client, teamId, toast],
  );

  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <TeamName name="Dummy Team" />

        <QuestionComponent.default
          question={question}
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
  const client = createSupabaseClient();
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
        topics: {
          include: {
            questions: true,
          },
          where: {
            id: Number(teamId),
          },
        },
      },
    }),
  ]);

  return {
    props: {
      client,
      gameId,
      game,
      question,
      questions:
        game?.topics.reduce(
          (acc, { questions }) => [
            ...acc,
            ...questions.map((q) => ({
              ...q,
              answer: '',
            })),
          ],
          [] as Question[],
        ) ?? [],
      teamId,
    },
  };
}
