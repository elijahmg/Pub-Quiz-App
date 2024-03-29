import { router } from '../trpc';

// Admin procedures
import { createQuiz } from './admin/create-quiz';
import { createRounds } from './admin/create-rounds';
import { createQuestions } from './admin/create-questions';
import { createQuizStatus } from './admin/create-quiz-status';
import { updateQuizWithQuizStatusId } from './admin/update-quiz-with-quiz-status-id';
import { updateQuizStatus } from './admin/update-quiz-status';
import { updateCurrentQuestion } from './admin/update-current-question';
import { getRounds } from './admin/get-rounds';
import { getQuestions } from './admin/get-questions';
import { getQuizByPassword } from './admin/get-quiz-by-password';
import { getFullQuizData } from './admin/get-full-quiz-data';
import { getTeamsByQuizId } from './admin/get-teams-by-quiz-id';
import { getTeamsWithAnswers } from './admin/get-teams-with-answers';
import { handleTeamScore } from './admin/handle-team-score';
import { getTeamsSummary } from './admin/get-teams-summary';

// Team procedures
import { createTeam } from './team/create-team';
import { getQuizByPin } from './team/get-quiz-by-pin';
import { submitAnswer } from './team/submit-answer';
import { getTeamAnswersByTeamId } from './team/get-team-answers-by-team-id';
import { updateTeamAnswer } from './team/update-team-answer';
import { getQuizStatusById } from './team/get-quiz-status-by-id';

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
    updateCurrentQuestion,
    getRounds,
    getQuestions,
    getQuizByPassword,
    getFullQuizData,
    getTeamsByQuizId,
    getTeamsWithAnswers,
    handleTeamScore,
    getTeamsSummary,
  }),
  team: router({
    createTeam,
    getQuizByPin,
    submitAnswer,
    getTeamAnswersByTeamId,
    updateTeamAnswer,
    getQuizStatusById,
  }),
});

export type AppRouter = typeof appRouter;
