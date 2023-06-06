import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quiz, Question, Round, Team } from '.prisma/client';
import { GenericObj } from '../types';
import { QuizStatus } from '@prisma/client';

// prisma selection
export const fullQuizDataForTeam = {
  quizStatus: {
    select: {
      status: true,
      id: true,
      currentQuestion: {
        select: {
          id: true,
          content: true,
          mediaType: true,
          mediaURL: true,
          roundId: true,
          round: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  },
  id: true,
  name: true,
  pin: true,
};

// State types
type QuestionSelection = Pick<
  Question,
  'id' | 'content' | 'mediaType' | 'mediaURL' | 'roundId'
>;

export interface CurrentQuestion extends QuestionSelection {
  round: Pick<Round, 'name'>;
}

type QuizStatusSelection = Pick<QuizStatus, 'id' | 'status'>;

interface QuizStatusState extends QuizStatusSelection {
  currentQuestion: CurrentQuestion;
}

type QuizSelection = Pick<Quiz, 'id' | 'name' | 'pin'>;

export interface QuizData extends QuizSelection {
  quizStatus: QuizStatusState | null;
}

interface TeamQuizDataState {
  quizData: QuizData | GenericObj;
  setQuizData: (quizData: QuizData) => void;
  teamData: Team | GenericObj;
  setTeamData: (quizData: Team) => void;
}

// State setup
export const useTeamQuizDataStore = create(
  persist<TeamQuizDataState>(
    (set) => ({
      quizData: {},
      setQuizData: (quizData: QuizData) => set(() => ({ quizData })),
      teamData: {},
      setTeamData: (teamData: Team) => set(() => ({ teamData })),
    }),
    { name: 'team-quiz-data' },
  ),
);
