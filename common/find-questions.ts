import { Topic } from '@prisma/client';
import { prisma } from './prisma-client';

export async function findTopics(gameId: string) {
  const topics = await prisma.topic.findMany({
    where: {
      gameId: Number(gameId),
    },
  });

  return topics ?? [];
}

export async function findQuestions(topics: Topic[]) {
  const questions = await prisma.question.findMany({
    where: {
      topicId: { in: topics.map(({ id }) => id) ?? [] },
    },
  });

  return questions;
}
