import { procedure } from '../../trpc';
import { z } from 'zod';

export const getTopics = procedure
  .input(
    z.object({
      gameId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { gameId } = input;

    return ctx.prisma.topic.findMany({
      where: {
        gameId,
      },
    });
  });
