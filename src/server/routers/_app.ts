import { router } from '../trpc';

// Admin procedures
import { createQuiz } from './admin/create-quiz';
import { createTopics } from './admin/create-topics';
import { createQuestions } from './admin/create-questions';
import { createGameStatus } from './admin/create-game-status';
import { editGame } from './admin/edit-game';
import { getTopics } from './admin/get-topics';
import { getQuestions } from './admin/get-questions';

// Team procedures
import { createTeam } from './team/create-team';
import { joinWithPin } from './team/join-with-pin';

// this a collection of routes
// hello is only an example
export const appRouter = router({
  admin: router({
    createQuiz,
    createTopics,
    createQuestions,
    createGameStatus,
    editGame,
    getTopics,
    getQuestions,
  }),
  team: router({
    createTeam,
    joinWithPin,
  }),
});

export type AppRouter = typeof appRouter;
