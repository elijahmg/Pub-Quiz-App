import { create } from 'zustand';

interface CreateQuizState {
  gameId: number;
  setGameId: (gameId: number) => void;
}

export const useCreateQuizStore = create<CreateQuizState>((set) => ({
  gameId: -1,
  setGameId: (gameId: number) => set(() => ({ gameId })),
}));
