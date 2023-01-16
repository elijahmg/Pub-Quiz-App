import { SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { prisma } from '../../../../../common/prisma-client';
import createSupabaseClient from '../../../../../common/supabase-client';
import AdminTopicForm from '../../../../../components/AdminTopicForm';
import { GameWithTopics, TopicWithQuestions } from '../../../../../types/main';

export type CreateTopicProps = {
  game?: GameWithTopics;
  client: SupabaseClient;
};

export default function CreateTopic({ game, client }: CreateTopicProps) {
  const { gameId } = useRouter().query;
  return (
    <AdminTopicForm
      game={
        game ?? {
          id: -1,
          topics: [] as TopicWithQuestions[],
          gameStatus: 'CREATION',
          password: '',
        }
      }
      client={client}
      gameId={String(gameId)}
      topicId={''}
    />
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
