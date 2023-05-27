import { z } from 'zod';
import { procedure } from '../../trpc';
import { QuizStatusEnum } from '.prisma/client';

export const updateQuizStatus = procedure
  .input(
    z.object({
      id: z.number(),
      quizStatus: z.enum([
        QuizStatusEnum.JOINING,
        QuizStatusEnum.PLAYING,
        QuizStatusEnum.END_ROUND,
        QuizStatusEnum.EVALUATION,
        QuizStatusEnum.SCORE_VIEWING,
        QuizStatusEnum.END_QUIZ,
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
