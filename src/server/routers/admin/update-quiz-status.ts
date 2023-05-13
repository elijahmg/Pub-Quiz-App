import { z } from 'zod';
import { procedure } from '../../trpc';
import { QuizStatuses } from '../../types';

export const updateQuizStatus = procedure
  .input(
    z.object({
      id: z.number(),
      quizStatus: z.enum([
        QuizStatuses.JOINING,
        QuizStatuses.PLAYING,
        QuizStatuses.END_ROUND,
        QuizStatuses.EVALUATION,
        QuizStatuses.SCORE_VIEWING,
        QuizStatuses.END_QUIZ,
      ]),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.quizStatus.update({
      where: {
        id: input.id,
      },
      data: {
        status: input.quizStatus,
      },
    });
  });
