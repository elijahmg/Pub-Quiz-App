import { router } from '../trpc';
import { createQuiz } from './admin/create-quiz';
import { createTopic } from './admin/create-topic';
import { createQuestion } from './admin/create-question';
import { createTeam } from './team/create-team';

// this a collection of routes
// hello is only an example
export const appRouter = router({
  admin: router({
    createQuiz,
    createTopic,
    createQuestion,
  }),
  team: router({
    createTeam,
  }),
});

export type AppRouter = typeof appRouter;
