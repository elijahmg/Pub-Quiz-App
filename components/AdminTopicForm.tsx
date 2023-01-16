import {
  Badge,
  Button,
  Center,
  FormControl,
  Input,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';

import { BaseSyntheticEvent, useCallback, useMemo, useState } from 'react';
import TopicName from '../components/TopicName';
import Constants from '../common/constants';
import {
  GameWithTopics,
  TopicWithQuestions,
  QuestionWithAnswer,
} from '../types/main';
import { SupabaseClient } from '@supabase/supabase-js';

export type AdminTopicsProps = {
  game: GameWithTopics;
  client: SupabaseClient;
  gameId: string;
  topicId: string;
};

export default function AdminTopicForm({
  game,
  client,
  topicId,
}: AdminTopicsProps) {
  const [selectedTopic, setSelectedTopic] = useState((): TopicWithQuestions => {
    return !topicId
      ? ({
          gameId: game.id,
          questions: [] as QuestionWithAnswer[],
          id: -1,
          name: '',
        } as TopicWithQuestions)
      : game.topics.find(({ id }) => topicId === String(id)) ??
          ({
            gameId: game.id,
            id: Math.random() * 50,
            name: '',
            questions: [] as QuestionWithAnswer[],
          } as TopicWithQuestions);
  });
  const [topicName, setTopicName] = useState('');
  const [testRound, setTestRound] = useState<GameWithTopics>(game);

  const topicNameDidChange = useCallback(
    ({ currentTarget }: BaseSyntheticEvent<InputEvent>) => {
      client.channel;
      setTopicName(currentTarget.value);
    },
    [setTopicName, client],
  );

  const allTopics = useMemo(
    (): TopicWithQuestions[] => [...game.topics, ...testRound.topics],
    [testRound.topics, game.topics],
  );

  const selectTopic = useCallback(
    ({ currentTarget }: BaseSyntheticEvent<MouseEvent>) => {
      setSelectedTopic(
        allTopics.find(
          (item: TopicWithQuestions) =>
            !!(item && item.id === Number(currentTarget.dataset.topicId)),
        ) ?? ({} as TopicWithQuestions),
      );
    },
    [setSelectedTopic, allTopics],
  );
  const topicAdded = useCallback(() => {
    const topic = {
      ...(selectedTopic ? selectedTopic : {}),
      name: topicName,
    } as TopicWithQuestions;

    client.channel('game')?.send({
      type: 'game',
      game: {
        ...game,
        topics: selectedTopic?.id
          ? game.topics.map((topic) =>
              topic.id === selectedTopic?.id ? selectedTopic : topic,
            )
          : game.topics.concat([topic]),
      },
    });

    if (!client) {
      setTestRound({
        ...game,
        topics: selectedTopic?.id
          ? allTopics.map((topic) =>
              topic.id === selectedTopic?.id ? selectedTopic : topic,
            )
          : allTopics.concat([
              {
                ...topic,
                id: Math.random() * 200,
              },
            ]),
      });
    }
  }, [selectedTopic, topicName, client, game, allTopics]);
  return (
    <Center>
      <Stack spacing={Constants.StackSpacing}>
        <TopicName name={selectedTopic?.name ?? topicName} />
        <FormControl>
          <Input placeholder="Topic name, sir" onInput={topicNameDidChange} />
          <Button onClick={topicAdded}>Add +</Button>
        </FormControl>
        <List>
          {allTopics.map((value: TopicWithQuestions) => {
            return (
              <ListItem
                key={value.id}
                onClick={selectTopic}
                data-topic-id={value.id}
              >
                {selectedTopic && selectedTopic.id === value.id ? (
                  <Badge colorScheme="purple">{value.name}</Badge>
                ) : (
                  <Text>{value.name}</Text>
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
