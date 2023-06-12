import { procedure } from '../../trpc';
import { z } from 'zod';
import { calculatePoints } from '../../../utils/helpers';

const teamAnswersSelection = (withAnswer = false) => ({
  id: true,
  answer: true,
  score: true,
  question: {
    select: {
      id: true,
      roundId: true,
      content: true,
      mediaURL: true,
      mediaType: true,
      answer: withAnswer,
    },
  },
});

export const getTeamAnswersByTeamId = procedure
  .input(
    z.object({
      teamId: z.number(),
      roundId: z.number(),
      withAnswer: z.boolean().optional(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { teamId, withAnswer, roundId } = input;

    const teamAnswers = await ctx.prisma.teamAnswers.findMany({
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
      select: teamAnswersSelection(withAnswer),
    });

    const filteredTeamAnswersByRoundId = teamAnswers.filter(
      (teamAnswer) => teamAnswer.question.roundId === roundId,
    );

    const totalScore = calculatePoints(
      teamAnswers?.map((teamAnswer) => teamAnswer.score || 0),
    );

    const scoresByRound = calculatePoints(
      filteredTeamAnswersByRoundId.map((teamAnswer) => teamAnswer.score || 0),
    );

    return { filteredTeamAnswersByRoundId, totalScore, scoresByRound };
  });
