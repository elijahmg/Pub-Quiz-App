import { router } from '../trpc';
import { hello } from './hello';

// this a collection of routes
// hello is only an example
export const appRouter = router({
  hello,
});

export type AppRouter = typeof appRouter;
