import { procedure } from '../../trpc';
import { z } from 'zod';
import { QuizStatuses } from '../../types';
import { selectQuizData } from '../../common-data-returns';

export const getQuizByPin = procedure
  .input(
    z.object({
      pin: z.string().min(4).max(4),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { pin } = input;

    const quiz = await ctx.prisma.quiz.findFirst({
      where: {
        pin,
        quizStatus: {
          status: QuizStatuses.JOINING,
        },
      },
      select: selectQuizData,
    });

    if (!quiz) {
      throw new Error('There is no quiz to join');
    }

    return quiz;
  });
