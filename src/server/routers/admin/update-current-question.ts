import { z } from 'zod';
import { procedure } from '../../trpc';

export const updateCurrentQuestion = procedure
  .input(
    z.object({
      newCurrentQuestionId: z.number(),
      quizStatusId: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.quizStatus.update({
      where: {
        id: input.quizStatusId,
      },
      data: {
        currentQuestionId: input.newCurrentQuestionId,
      },
    });
  });
