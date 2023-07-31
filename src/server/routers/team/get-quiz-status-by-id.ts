import { procedure } from '../../trpc';
import { z } from 'zod';

export const getQuizStatusById = procedure
  .input(
    z.object({
      quizStatusId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { quizStatusId } = input;

    return await ctx.prisma.quizStatus.findFirst({
      where: {
        id: quizStatusId,
      },
      select: {
        status: true,
        id: true,
        currentQuestion: {
          select: {
            id: true,
            content: true,
            mediaType: true,
            mediaURL: true,
            roundId: true,
            round: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  });
