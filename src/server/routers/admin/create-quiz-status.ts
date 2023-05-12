import { procedure } from '../../trpc';
import { z } from 'zod';
import { QuizStatusEnum } from '.prisma/client';

export const createQuizStatus = procedure
  .input(
    z.object({
      currentQuestionId: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.prisma.quizStatus.create({
      data: {
        ...input,
        currentQuestionId: input.currentQuestionId,
        status: QuizStatusEnum.JOINING,
      },
    });
  });
