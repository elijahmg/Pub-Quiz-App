import { procedure } from '../../trpc';
import { z } from 'zod';

export const createTeam = procedure
  .input(
    z.object({
      name: z.string().max(32),
      gameId: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { name, gameId } = input;

    return ctx.prisma.team.create({
      data: {
        name: name,
        gameId,
      },
    });
  });
