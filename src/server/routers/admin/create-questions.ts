import { procedure } from '../../trpc';
import { z } from 'zod';
import { MediaTypes } from '../../types';

export const createQuestions = procedure
  .input(
    z.array(
      z.object({
        content: z.string(),
        answer: z.string(),
        topicId: z.number(),
        mediaURL: z.string().optional(),
        mediaType: z
          .enum([MediaTypes.VIDEO, MediaTypes.AUDIO, MediaTypes.IMAGE])
          .optional(),
      }),
    ),
  )
  .mutation(async ({ input, ctx }) => {
    if (
      input.some(
        (question) =>
          (question.mediaURL && !question.mediaType) ||
          (!question.mediaURL && question.mediaType),
      )
    ) {
      throw new Error('MediaURL and mediaType should be provided together');
    }

    return ctx.prisma.question.createMany({
      data: input,
    });
  });
