import {
  Badge,
  Button,
  Center,
  FormControl,
  Input,
  List,
  ListItem,
  Stack,
} from '@chakra-ui/react';
import Link from 'next/link';

import { BaseSyntheticEvent, useCallback, useMemo, useState } from 'react';
import TopicName from '../components/TopicName';
import Constants from '../constants';
import { Round, Topic } from '../types/main';

export type AdminTopicsProps = {
  round: Round;
  client: any;
  gameId: string;
  topicId: string;
};

export default function AdminTopicForm({
  round,
  client,
  topicId,
  gameId,
}: AdminTopicsProps) {
  const [selectedTopic, setSelectedTopic] = useState((): Topic => {
    return !topicId
      ? ({} as Topic)
      : round.topics.find(({ id }) => topicId === String(id)) ??
          ({ id: Math.random() * 50 } as Topic);
  });
  const [topicName, setTopicName] = useState('');
  const [testRound, setTestRound] = useState<Round>(round);

  const topicNameDidChange = useCallback(
    ({ currentTarget }: BaseSyntheticEvent<InputEvent>) => {
      setTopicName(currentTarget.value);
    },
    [setTopicName],
  );

  const allTopics = useMemo(
    () => [...round.topics, ...testRound.topics],
    [testRound.topics, round.topics],
  );

  const selectTopic = useCallback(
    ({ currentTarget }: BaseSyntheticEvent<MouseEvent>) => {
      setSelectedTopic(allTopics[Number(currentTarget.dataset.topicId)]);
    },
    [setSelectedTopic, allTopics],
  );
  const topicAdded = useCallback(() => {
    const topic = {
      ...selectedTopic,
      name: topicName,
    };

    client?.send({
      gameId,
      round: {
        ...round,
        topics: selectedTopic?.id
          ? round.topics.map((topic) =>
              topic.id === selectedTopic?.id ? selectedTopic : topic,
            )
          : round.topics.concat([topic]),
      },
    });

    if (!client) {
      setTestRound({
        ...round,
        topics: selectedTopic?.id
          ? allTopics.map((topic) =>
              topic.id === selectedTopic?.id ? selectedTopic : topic,
            )
          : allTopics.concat([
              {
                ...topic,
                id: Math.random() * 200,
                questions: [],
              },
            ]),
      });
    }
  }, [selectedTopic, topicName, client, gameId, round, allTopics]);
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <TopicName name={selectedTopic?.name ?? topicName} />
        <FormControl>
          <Input placeholder="Topic name, sir" onInput={topicNameDidChange} />
          <Button onClick={topicAdded}>Add +</Button>
        </FormControl>
        <List>
          {allTopics.map(({ id, name }: Topic) => {
            return (
              <ListItem key={id} onClick={selectTopic} data-topic-id={id}>
                {selectedTopic && selectedTopic.id === id ? (
                  <Badge colorScheme="purple">{name}</Badge>
                ) : (
                  name
                )}
              </ListItem>
            );
          })}
        </List>

        <Link
          href={`/admin/edit/questions/${
            selectedTopic && selectedTopic.id ? selectedTopic.id : ''
          }`}
        >
          Add/Edit pages
        </Link>
      </Stack>
    </Center>
  );
}
