import { procedure } from '../../trpc';
import { z } from 'zod';

const teamAnswersSelection = {
  id: true,
  answer: true,
  question: {
    select: {
      content: true,
    },
  },
};

export const getTeamAnswersByTeamId = procedure
  .input(
    z.object({
      teamId: z.number(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { teamId } = input;

    return await ctx.prisma.teamAnswers.findMany({
      orderBy: [
        {
          question: {
            id: 'asc',
          },
        },
      ],
      where: {
        teamId,
      },
      select: teamAnswersSelection,
    });
  });
