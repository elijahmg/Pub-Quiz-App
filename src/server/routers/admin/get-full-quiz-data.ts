import { z } from 'zod';
import { procedure } from '../../trpc';
import { selectFullQuizAdminData } from '../../../state/admin/admin-quiz-data.state';

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
      select: selectFullQuizAdminData,
    });
  });
