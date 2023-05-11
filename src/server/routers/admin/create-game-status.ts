import { procedure } from '../../trpc';
import { z } from 'zod';
import { GameStatusEnum } from '.prisma/client';

export const createGameStatus = procedure
  .input(
    z.object({
      currentQuestionId: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.gameStatus.create({
      data: {
        ...input,
        currentQuestionId: input.currentQuestionId,
        status: GameStatusEnum.JOINING,
      },
    });
  });
