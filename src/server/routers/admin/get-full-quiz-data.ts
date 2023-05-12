import { z } from 'zod';
import { procedure } from '../../trpc';

export const getFullQuizData = procedure
  .input(
    z.object({
      quizId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    return ctx.prisma.quiz.findFirst({
      where: {
        id: input.quizId,
      },
      select: {
        id: true,
        name: true,
        pin: true,
        quizStatus: {
          select: {
            id: true,
            status: true,
            currentQuestion: {
              select: {
                id: true,
                roundId: true,
              },
            },
          },
        },
        rounds: {
          select: {
            id: true,
            name: true,
            questions: {
              select: {
                answer: true,
                content: true,
                id: true,
                mediaType: true,
                mediaURL: true,
              },
            },
          },
        },
      },
    });
  });
