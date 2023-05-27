import { procedure } from '../../trpc';
import { z } from 'zod';
import { fullQuizDataForTeam } from '../../../state/team/team-quiz-data.state';
import { QuizStatusEnum } from '.prisma/client';

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
          status: QuizStatusEnum.JOINING,
        },
      },
      select: fullQuizDataForTeam,
    });

    if (!quiz) {
      throw new Error('There is no quiz to join');
    }

    return quiz;
  });
