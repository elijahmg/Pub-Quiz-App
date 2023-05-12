import { create } from 'zustand';

export interface QuizData {
  gameStatusId: number | null;
  id: number;
  name: string;
  pin: string;
}

interface QuizDataState {
  quizData: QuizData | Record<string, undefined>;
  setQuizData: (quizData: QuizData) => void;
}

export const useQuizDataStore = create<QuizDataState>((set) => ({
  quizData: {},
  setQuizData: (quizData: QuizData) => set(() => ({ quizData })),
}));
