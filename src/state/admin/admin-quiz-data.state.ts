import { create } from 'zustand';
import type { QuizStatus, Question, Round } from '@prisma/client';
import { GenericObj } from '../types';

export const selectFullQuizAdminData = {
  id: true,
  name: true,
  pin: true,
  quizStatus: {
    select: {
      id: true,
      status: true,
      currentQuestion: {
        select: {
          id: true,
          roundId: true,
        },
      },
    },
  },
  rounds: {
    select: {
      id: true,
      name: true,
      questions: {
        select: {
          answer: true,
          content: true,
          id: true,
          mediaType: true,
          mediaURL: true,
        },
      },
    },
  },
};

type QuizStatusSelection = Pick<QuizStatus, 'id' | 'status'>;
type CurrentQuestionSelection = Pick<Question, 'id' | 'roundId'>;
export type QuestionSelection = Pick<
  Question,
  'id' | 'content' | 'answer' | 'mediaURL' | 'mediaType'
>;
type RoundSelection = Pick<Round, 'id' | 'name'>;

interface QuizStatusState extends QuizStatusSelection {
  currentQuestion: CurrentQuestionSelection;
}

interface RoundState extends RoundSelection {
  questions: QuestionSelection[];
}

export interface QuizData {
  id: number;
  name: string;
  pin: string;
  rounds: RoundState[];
  quizStatus: QuizStatusState;
}

interface AdminQuizDataState {
  quizData: QuizData | GenericObj;
  setQuizData: (quizData: QuizData) => void;
}

export const useAdminQuizDataState = create<AdminQuizDataState>((set) => ({
  quizData: {},
  setQuizData: (quizData) => set({ quizData }),
}));
