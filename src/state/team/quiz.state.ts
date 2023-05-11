import { create } from 'zustand';

export interface QuizData {
  gameStatusId: number | null;
  id: number;
  name: string;
}

interface QuizState {
  quizData: QuizData | Record<string, undefined>;
  setQuizData: (quizData: QuizData) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  quizData: {},
  setQuizData: (quizData: QuizData) => set(() => ({ quizData })),
}));
