import { MediaTypes, QuizStatuses } from '../../server/types';
import { create } from 'zustand';

/**
 * All interfaces reflect fields selection in
 * src/server/routers/admin/get-full-quiz-data.ts
 * **/

interface QuizStatus {
  id: number;
  status: QuizStatuses;
  currentQuestion: CurrentQuestion;
}

interface CurrentQuestion {
  id: number;
  roundId: number;
}

interface Question {
  id: number;
  content: string;
  answer: string;
  mediaURL: string | null;
  mediaType: MediaTypes | null;
}

interface Round {
  id: number;
  name: string;
  questions: Question[];
}

export interface QuizData {
  id: number;
  name: string;
  pin: string;
  rounds: Round[];
  quizStatus: QuizStatus | null;
}

interface AdminQuizDataState {
  quizData: QuizData | null;
  setQuizData: (quizData: QuizData) => void;
}

export const useAdminQuizDataState = create<AdminQuizDataState>((set) => ({
  quizData: null,
  setQuizData: (quizData) => set({ quizData }),
}));
