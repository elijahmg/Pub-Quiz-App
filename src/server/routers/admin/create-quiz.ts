import { procedure } from '../../trpc';
import { z } from 'zod';
import { GameStatuses } from '../../types';

export const createQuiz = procedure
  .input(
    z.object({
      name: z.string().max(32),
      password: z.string().min(4).max(8),
      pin: z.string().min(4).max(4),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { name, password, pin } = input;

    return ctx.prisma.game.create({
      data: {
        name: name,
        password: password,
        pin: pin,
        gameStatus: GameStatuses.CREATION,
      },
    });
  });