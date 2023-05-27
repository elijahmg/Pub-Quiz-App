import { procedure } from '../../trpc';
import { z } from 'zod';

export const submitAnswer = procedure
  .input(
    z.object({
      teamId: z.number(),
      questionId: z.number(),
      answer: z.string().max(255),
      teamAnswerId: z.number().optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { teamId, questionId, answer, teamAnswerId } = input;

    return ctx.prisma.teamAnswers.upsert({
      where: {
        id: teamAnswerId || 0,
      },
      update: {
        answer,
      },
      create: {
        answer,
        teamId,
        questionId,
      },
    });
  });
