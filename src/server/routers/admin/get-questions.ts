import { procedure } from '../../trpc';
import { z } from 'zod';

export const getQuestions = procedure
  .input(
    z.object({
      topicId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { topicId } = input;

    return ctx.prisma.question.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        topicId,
      },
    });
  });
