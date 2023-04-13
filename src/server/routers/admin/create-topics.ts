import { procedure } from '../../trpc';
import { z } from 'zod';

export const createTopics = procedure
  .input(
    z.object({
      gameId: z.number(),
      rounds: z.array(z.string().max(32)),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { rounds, gameId } = input;

    return ctx.prisma.topic.createMany({
      data: rounds.map((roundName) => ({
        gameId,
        name: roundName,
      })),
    });
  });
