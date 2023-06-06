import { z } from 'zod';
import { procedure } from '../../trpc';

export const handleTeamScore = procedure
  .input(
    z.object({
      teamAnswerId: z.number(),
      score: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { teamAnswerId, score } = input;

    return ctx.prisma.teamAnswers.update({
      where: {
        id: teamAnswerId,
      },
      data: {
        score,
      },
    });
  });
