import { procedure } from '../../trpc';
import { z } from 'zod';

export const getQuestions = procedure
  .input(
    z.object({
      roundId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { roundId } = input;

    return ctx.prisma.question.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        roundId,
      },
    });
  });
