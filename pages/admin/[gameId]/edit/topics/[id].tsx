import { useRouter } from 'next/router';
import AdminTopicForm from '../../../../../components/AdminTopicForm';
import { GetServerSidePropsContext } from 'next/types';
import { prisma } from '../../../../../common/prisma-client';
import { GameWithTopics, TopicWithQuestions } from '../../../../../types/main';
import { SupabaseClient } from '@supabase/supabase-js';
import createSupabaseClient from '../../../../../common/supabase-client';

export type EditTopicProps = {
  game?: GameWithTopics;
  client: SupabaseClient;
};

export default function EditTopic({ game, client }: EditTopicProps) {
  const { gameId, id: topicId } = useRouter().query;
  return (
    <AdminTopicForm
      game={
        game ??
        ({
          name: 'empty',
          id: -1,
          topics: [] as TopicWithQuestions[],
          gameStatus: 'CREATION',
          password: '',
        } as GameWithTopics)
      }
      client={client}
      gameId={String(gameId)}
      topicId={String(topicId)}
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
