import { procedure } from '../../trpc';
import { z } from 'zod';

export const updateQuizWithQuizStatusId = procedure
  .input(
    z.object({
      quizId: z.number(),
      quizStatusId: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.quiz.update({
      where: {
        id: input.quizId,
      },
      data: {
        quizStatusId: input.quizStatusId,
      },
    });
  });
