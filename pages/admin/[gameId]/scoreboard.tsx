import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Heading,
  Stack,
  Button,
} from '@chakra-ui/react';
import { Game, Team } from '@prisma/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { GetServerSidePropsContext } from 'next/types';
import { useMemo } from 'react';
import { prisma } from '../../../common/prisma-client';
import createSupabaseClient from '../../../common/supabase-client';
import TeamName from '../../../components/TopicName';
import { GameWithTeams } from '../../../types/main';

export default function Scoreboard({
  game,
  client,
}: {
  game: GameWithTeams;
  client: SupabaseClient;
}) {
  const gotToNextQuestion = useMemo(
    () => () => {
      client.channel('question').send({
        type: 'Question',
      });
    },
    [client],
  );
  return (
    <Stack>
      <Heading as="h2">Scoreboard</Heading>
      <Table>
        <Thead>
          <Tr>
            <Td>Team name</Td>
            <Td>Score</Td>
          </Tr>
        </Thead>
        <Tbody>
          {game.teams.map((team) => (
            <Tr key={team.id}>
              <Td>
                <TeamName name={team.name} />
              </Td>
              <Td>
                {team.answers.reduce((acc: number, { score }) => {
                  return acc + (score ?? 0);
                }, 0)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button onClick={gotToNextQuestion}>Next question</Button>
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
