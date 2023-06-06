import { z } from 'zod';
import { procedure } from '../../trpc';

export const getTeamsByQuizId = procedure
  .input(
    z.object({
      quizId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { quizId } = input;

    return ctx.prisma.team.findMany({
      where: {
        quizId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  });
