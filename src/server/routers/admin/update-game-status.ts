import { z } from 'zod';
import { procedure } from '../../trpc';
import { GameStatuses } from '../../types';

export const updateGameStatus = procedure
  .input(
    z.object({
      id: z.number(),
      gameStatus: z.enum([
        GameStatuses.JOINING,
        GameStatuses.PLAYING,
        GameStatuses.END_ROUND,
        GameStatuses.EVALUATION,
        GameStatuses.SCORE_VIEWING,
        GameStatuses.END_QUIZ,
      ]),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.gameStatus.update({
      where: {
        id: input.id,
      },
      data: {
        status: input.gameStatus,
      },
    });
  });
