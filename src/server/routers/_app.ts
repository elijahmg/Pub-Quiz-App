import { router } from '../trpc';

// Admin procedures
import { createQuiz } from './admin/create-quiz';
import { createTopics } from './admin/create-topics';
import { createQuestions } from './admin/create-questions';
import { createGameStatus } from './admin/create-game-status';
import { editGame } from './admin/edit-game';
import { getTopics } from './admin/get-topics';
import { getQuestions } from './admin/get-questions';
import { getQuizByPassword } from './admin/get-quiz-by-password';

// Team procedures
import { createTeam } from './team/create-team';
import { getQuizByPin } from './team/get-quiz-by-pin';

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
    getQuizByPassword,
  }),
  team: router({
    createTeam,
    joinWithPin: getQuizByPin,
  }),
});

export type AppRouter = typeof appRouter;
