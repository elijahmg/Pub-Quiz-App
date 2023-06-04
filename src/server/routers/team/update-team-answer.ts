import { z } from 'zod';
import { procedure } from '../../trpc';

export const updateTeamAnswer = procedure
  .input(
    z.object({
      teamAnswerId: z.number(),
      newAnswer: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { teamAnswerId, newAnswer } = input;

    return ctx.prisma.teamAnswers.update({
      where: {
        id: teamAnswerId,
      },
      data: {
        answer: newAnswer,
      },
    });
  });
