import { z } from 'zod';
import { procedure } from '../../trpc';

export const getTeamsWithAnswers = procedure
  .input(
    z.object({
      quizId: z.number(),
      roundId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { quizId, roundId } = input;

    return await ctx.prisma.team.findMany({
      where: {
        quizId,
      },
      select: {
        id: true,
        name: true,
        answers: {
          where: {
            question: {
              roundId,
            },
          },
          orderBy: {
            questionId: 'asc',
          },
          select: {
            id: true,
            answer: true,
            score: true,
            question: {
              select: {
                id: true,
                answer: true,
                content: true,
                mediaURL: true,
                mediaType: true,
              },
            },
          },
        },
      },
    });
  });
