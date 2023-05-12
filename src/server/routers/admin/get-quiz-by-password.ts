import { procedure } from '../../trpc';
import { z } from 'zod';
import { selectQuizData } from '../../common-data-returns';

export const getQuizByPassword = procedure
  .input(
    z.object({
      password: z.string().min(4).max(8),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { password } = input;

    return ctx.prisma.game.findFirst({
      where: {
        password,
      },
      select: selectQuizData,
    });
  });
