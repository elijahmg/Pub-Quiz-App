import { router } from '../trpc';
import { createQuiz } from './admin/create-quiz';
import { createTopic } from './admin/create-topic';

// this a collection of routes
// hello is only an example
export const appRouter = router({
  admin: router({
    createQuiz,
    createTopic,
  }),
});

export type AppRouter = typeof appRouter;
