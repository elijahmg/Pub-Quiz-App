import { procedure } from '../../trpc';
import { z } from 'zod';

export const createTopic = procedure
  .input(
    z.object({
      gameId: z.number(),
      name: z.string().max(32),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { name, gameId } = input;

    return ctx.prisma.topic.create({
      data: {
        gameId,
        name,
      },
    });
  });
