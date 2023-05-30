import { procedure } from '../../trpc';
import { z } from 'zod';
import { fullQuizDataForTeam } from '../../../state/team/team-quiz-data.state';
import { QuizStatusEnum } from '.prisma/client';

export const getQuizByPin = procedure
  .input(
    z.object({
      pin: z.string().min(4).max(4),
      quizStatus: z
        .enum([
          QuizStatusEnum.JOINING,
          QuizStatusEnum.PLAYING,
          QuizStatusEnum.END_ROUND,
          QuizStatusEnum.EVALUATION,
          QuizStatusEnum.SCORE_VIEWING,
          QuizStatusEnum.END_QUIZ,
        ])
        .optional(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { pin, quizStatus } = input;

    const quiz = await ctx.prisma.quiz.findFirst({
      where: {
        pin,
        quizStatus: {
          status: quizStatus || QuizStatusEnum.JOINING,
        },
      },
      select: fullQuizDataForTeam,
    });

    if (!quiz) {
      throw new Error('There is no quiz to join');
    }

    return quiz;
  });
