import { procedure } from '../../trpc';
import { z } from 'zod';

export const createRounds = procedure
  .input(
    z.object({
      quizId: z.number(),
      rounds: z.array(z.string().max(32)),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { rounds, quizId } = input;

    return ctx.prisma.round.createMany({
      data: rounds.map((roundName) => ({
        quizId,
        name: roundName,
      })),
    });
  });
