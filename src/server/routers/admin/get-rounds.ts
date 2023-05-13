import { procedure } from '../../trpc';
import { z } from 'zod';

export const getRounds = procedure
  .input(
    z.object({
      quizId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { quizId } = input;

    return ctx.prisma.round.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        quizId,
      },
    });
  });
