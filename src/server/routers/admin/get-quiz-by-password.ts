import { z } from 'zod';
import { procedure } from '../../trpc';
import { selectFullQuizAdminData } from '../../../state/admin/admin-quiz-data.state';

export const getQuizByPassword = procedure
  .input(
    z.object({
      password: z.string().min(4).max(8),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { password } = input;

    return ctx.prisma.quiz.findFirst({
      where: {
        password,
      },
      select: selectFullQuizAdminData,
    });
  });
