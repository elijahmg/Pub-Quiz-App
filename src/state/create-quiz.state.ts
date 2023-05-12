import { create } from 'zustand';

interface CreateQuizState {
  quizId: number;
  setQuizId: (quizId: number) => void;
}

export const useCreateQuizStore = create<CreateQuizState>((set) => ({
  quizId: -1,
  setQuizId: (quizId: number) => set(() => ({ quizId })),
}));
