import { procedure } from '../../trpc';
import { z } from 'zod';

export const createTeam = procedure
  .input(
    z.object({
      name: z.string().max(32),
      quizId: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { name, quizId } = input;

    return ctx.prisma.team.create({
      data: {
        name: name,
        quizId,
      },
    });
  });
