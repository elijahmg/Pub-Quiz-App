import { router } from '../trpc';
import { createQuiz } from './admin/create-quiz';

// this a collection of routes
// hello is only an example
export const appRouter = router({
  admin: router({
    createQuiz: createQuiz,
  }),
});

export type AppRouter = typeof appRouter;
