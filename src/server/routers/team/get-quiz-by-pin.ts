import { procedure } from '../../trpc';
import { z } from 'zod';
import { GameStatuses } from '../../types';
import { selectQuizData } from '../../common-data-returns';

export const getQuizByPin = procedure
  .input(
    z.object({
      pin: z.string().min(4).max(4),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { pin } = input;

    const game = await ctx.prisma.game.findFirst({
      where: {
        pin,
        gameStatus: {
          status: GameStatuses.JOINING,
        },
      },
      select: selectQuizData,
    });

    if (!game) {
      throw new Error('There is no game to join');
    }

    return game;
  });
