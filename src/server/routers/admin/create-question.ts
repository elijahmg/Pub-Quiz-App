import { procedure } from '../../trpc';
import { z } from 'zod';
import { MediaTypes } from '../../types';

export const createQuestion = procedure
  .input(
    z.object({
      content: z.string(),
      answer: z.string(),
      topicId: z.number(),
      mediaURL: z.string().optional(),
      mediaType: z
        .enum([MediaTypes.VIDEO, MediaTypes.AUDIO, MediaTypes.IMAGE])
        .optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { content, answer, topicId, mediaURL, mediaType } = input;

    if ((mediaURL && !mediaType) || (!mediaURL && mediaType)) {
      throw new Error('MediaURL and mediaType should be provided together');
    }

    return ctx.prisma.question.create({
      data: {
        content,
        answer,
        topicId,
        mediaURL,
        mediaType,
      },
    });
  });
