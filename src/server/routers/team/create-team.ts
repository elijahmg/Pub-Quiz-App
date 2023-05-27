import { z } from 'zod';
import { procedure } from '../../trpc';
import {
  MIN_TEAM_NAME_LENGTH,
  MAX_TEAM_NAME_LENGTH,
} from '../../../../constants';

export const createTeam = procedure
  .input(
    z.object({
      name: z.string().min(MIN_TEAM_NAME_LENGTH).max(MAX_TEAM_NAME_LENGTH),
      quizId: z.number(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { name, quizId } = input;

    return ctx.prisma.team.create({
      data: {
        name: name,
        quizId,
      },
    });
  });
