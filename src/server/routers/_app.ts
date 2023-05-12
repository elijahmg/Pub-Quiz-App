import { router } from '../trpc';

// Admin procedures
import { createQuiz } from './admin/create-quiz';
import { createRounds } from './admin/create-rounds';
import { createQuestions } from './admin/create-questions';
import { createQuizStatus } from './admin/create-quiz-status';
import { updateQuizWithQuizStatusId } from './admin/update-quiz-with-quiz-status-id';
import { updateQuizStatus } from './admin/update-quiz-status';
import { getRounds } from './admin/get-rounds';
import { getQuestions } from './admin/get-questions';
import { getQuizByPassword } from './admin/get-quiz-by-password';
import { getFullQuizData } from './admin/get-full-quiz-data';

// Team procedures
import { createTeam } from './team/create-team';
import { getQuizByPin } from './team/get-quiz-by-pin';

// this a collection of routes
// hello is only an example
export const appRouter = router({
  admin: router({
    createQuiz,
    createRounds,
    createQuestions,
    createQuizStatus,
    updateQuizWithQuizStatusId,
    updateQuizStatus,
    getRounds,
    getQuestions,
    getQuizByPassword,
    getFullQuizData,
  }),
  team: router({
    createTeam,
    getQuizByPin,
  }),
});

export type AppRouter = typeof appRouter;
