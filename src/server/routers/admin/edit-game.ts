import { procedure } from '../../trpc';
import { z } from 'zod';

export const editGame = procedure
  .input(
    z.object({
      gameId: z.number(),
      gameStatusId: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.game.update({
      where: {
        id: input.gameId,
      },
      data: {
        gameStatusId: input.gameStatusId,
      },
    });
  });
