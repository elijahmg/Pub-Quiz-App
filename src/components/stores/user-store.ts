import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Quiz, Team } from '../../../types';

interface StoreState {
  quiz?: Quiz;
  setQuiz: (quiz: Quiz) => void;
  team?: Team;
  setTeam: (team: Team) => void;
  roundIndex: number;
  setRoundIndex: (roundIndex: number) => void;
}

export const useUserStore = create<StoreState>()(
  persist(
    (set) => ({
      quiz: undefined,
      setQuiz: (quiz) => set({ quiz }),
      team: undefined,
      setTeam: (team) => set({ team }),
      roundIndex: 0,
      setRoundIndex: (roundIndex) => set({ roundIndex }),
    }),
    { name: 'pubQuizApp-user-storage' },
  ),
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const useUserStore = (selector?: any, equalityFn?: any) => {
//   const [storeState, setStoreState] = useState<StoreState>({
//     quiz: undefined,
//     setQuiz: () => undefined,
//     team: undefined,
//     setTeam: () => undefined,
//   });

//   const persistedStore: StoreState = usePersistedUserStore(
//     selector,
//     equalityFn,
//   );

//   useEffect(() => {
//     setStoreState(persistedStore);
//   }, []);

//   return storeState;
// };
