import { router } from '../trpc';

// Admin procedures
import { createQuiz } from './admin/create-quiz';
import { createTopic } from './admin/create-topic';
import { createQuestion } from './admin/create-question';

// Team procedures
import { createTeam } from './team/create-team';
import { joinWithPin } from './team/join-with-pin';

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
    joinWithPin,
  }),
});

export type AppRouter = typeof appRouter;
