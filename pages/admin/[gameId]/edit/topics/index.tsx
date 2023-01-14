import { useRouter } from 'next/router';
import AdminTopicForm from '../../../../../components/AdminTopicForm';
import { Round } from '../../../../../types/main';

export type CreateTopicProps = {
  round?: Round;
  client: any;
};

export default function CreateTopic({ round, client }: CreateTopicProps) {
  const { gameId } = useRouter().query;
  return (
    <AdminTopicForm
      round={
        round ?? {
          name: 'empty',
          id: -1,
          topics: [],
        }
      }
      client={client}
      gameId={String(gameId)}
      topicId={''}
    />
  );
}
