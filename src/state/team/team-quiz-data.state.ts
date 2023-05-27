import { create } from 'zustand';
import type { Quiz, Question, Round, Team } from '.prisma/client';

// prisma selection
export const fullQuizDataForTeam = {
  quizStatus: {
    select: {
      currentQuestion: {
        select: {
          id: true,
          content: true,
          mediaType: true,
          mediaURL: true,
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
  'id' | 'content' | 'mediaType' | 'mediaURL'
>;

export interface CurrentQuestion extends QuestionSelection {
  round: Pick<Round, 'name'>;
}

interface QuizStatusSelection {
  currentQuestion: CurrentQuestion;
}

type QuizSelection = Pick<Quiz, 'id' | 'name' | 'pin'>;

export interface QuizData extends QuizSelection {
  quizStatus: QuizStatusSelection | null;
}

type GenericObj = Record<string, undefined>;

interface TeamQuizDataState {
  quizData: QuizData | GenericObj;
  setQuizData: (quizData: QuizData) => void;
  teamData: Team | GenericObj;
  setTeamData: (quizData: Team) => void;
}

// State setup
export const useTeamQuizDataStore = create<TeamQuizDataState>((set) => ({
  quizData: {},
  setQuizData: (quizData: QuizData) => set(() => ({ quizData })),
  teamData: {},
  setTeamData: (teamData: Team) => set(() => ({ teamData })),
}));
