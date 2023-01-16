import { Button, Stack, Heading } from '@chakra-ui/react';
import { Team } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { prisma } from '../../../common/prisma-client';

export default function TeamsCheck({ teams }: { teams: Team[] }) {
  return (
    <Stack>
      <Stack>
        <Heading as="h2">Teams overview</Heading>
        {teams.map(({ name, id }) => (
          <Button key={id}>{name}</Button>
        ))}
      </Stack>
      <Button>Check answers</Button>
    </Stack>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { gameId } = context.query;
  const teams = await prisma.team.findMany({
    where: {
      gameId: Number(gameId),
    },
  });
  return {
    props: {
      teams,
    },
  };
}
