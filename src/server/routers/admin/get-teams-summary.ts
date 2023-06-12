import { z } from 'zod';
import { procedure } from '../../trpc';

interface ParsedTeam {
  id: number;
  name: string;
  totalScore: number;
  rounds: {
    id: number;
    totalRoundScore: number;
  }[];
}

export const getTeamsSummary = procedure
  .input(
    z.object({
      quizId: z.number(),
      rounds: z.array(
        z.object({
          id: z.number(),
        }),
      ),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { quizId, rounds } = input;

    const teamsWithScores = await ctx.prisma.team.findMany({
      where: {
        quizId,
      },
      select: {
        id: true,
        name: true,
        answers: {
          select: {
            id: true,
            score: true,
            question: {
              select: {
                roundId: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return teamsWithScores.reduce((acc, team) => {
      const totalScore = team.answers.reduce(
        (acc, answer) => (acc += answer.score || 0),
        0,
      );

      const teamData: ParsedTeam = {
        id: team.id,
        name: team.name,
        totalScore,
        rounds: rounds.map((round) => {
          const totalRoundScore: number = team.answers
            .filter((answer) => answer.question.roundId === round.id)
            .reduce((acc, answer) => (acc += answer.score || 0), 0);

          return {
            id: round.id,
            totalRoundScore,
          };
        }),
      };

      acc.push(teamData);
      return acc;
    }, [] as ParsedTeam[]);
  });
