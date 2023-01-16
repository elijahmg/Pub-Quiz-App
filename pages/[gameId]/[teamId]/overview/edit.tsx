import { Question } from '@prisma/client';
import { GetServerSidePropsContext } from 'next';
import { prisma } from '../../../../common/prisma-client';
import TeamOverviewTable from '../../../../components/TeamOverviewTable';
import { QuestionWithTeamAnswer } from '../../../../types/main';

export default function OverviewEdit({
  name,
  questions = [],
  teamId,
}: {
  name: string;
  questions?: QuestionWithTeamAnswer[];
  teamId: number;
}) {
  return (
    <TeamOverviewTable
      name={name}
      teamId={teamId}
      questions={questions}
      allowEdit
    />
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { gameId, teamId } = context.query;
  const [game, team] = await Promise.all([
    prisma.game.findUnique({
      where: {
        id: Number(gameId),
      },
      include: {
        topics: {
          include: {
            questions: {
              include: {
                teamAnswers: {
                  where: {
                    teamId: Number(teamId),
                  },
                },
              },
            },
          },
        },
      },
    }),
    prisma.team.findUnique({
      where: {
        id: Number(teamId),
      },
    }),
  ]);

  return {
    props: {
      gameId,
      name: team?.name ?? '',
      questions:
        game?.topics.reduce((acc, { questions }) => {
          return [...acc, ...questions];
        }, [] as Question[]) ?? [],
    },
  };
}
