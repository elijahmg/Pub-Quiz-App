import { procedure } from '../../trpc';
import { z } from 'zod';
import { MediaTypeEnum } from '.prisma/client';

export const createQuestions = procedure
  .input(
    z.array(
      z.object({
        content: z.string(),
        answer: z.string(),
        roundId: z.number(),
        mediaURL: z.string().nullable().default(null),
        mediaType: z
          .enum([MediaTypeEnum.VIDEO, MediaTypeEnum.AUDIO, MediaTypeEnum.IMAGE])
          .nullable()
          .default(null),
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
