import { useRouter } from 'next/router';
import { Round } from '../../../../../types/main';
import AdminTopicForm from '../../../../../components/AdminTopicForm';

export type EditTopicProps = {
  round?: Round;
  client: any;
};

export default function EditTopic({ round, client }: EditTopicProps) {
  const { gameId, id: topicId } = useRouter().query;
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
      topicId={String(topicId)}
    />
  );
}
