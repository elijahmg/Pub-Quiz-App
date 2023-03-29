import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { StoreQuiz } from '../../../types';

const QUIZ_PRESET = { name: '', pin: '', password: '', rounds: [] };

interface AdminCreatorContextType {
  quizData: StoreQuiz;
  setQuizData: (quizData: StoreQuiz) => void;
}

const AdminCreatorContext = createContext<AdminCreatorContextType>({
  quizData: QUIZ_PRESET,
  setQuizData: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const AdminCreatorProvider = ({ children }: Props) => {
  const [quizData, setQuizData] = useState<StoreQuiz>(QUIZ_PRESET);

  const handleSetQuizData = (quizData: StoreQuiz) => {
    setQuizData(quizData);
  };

  const contextValue = useMemo(
    () => ({ quizData, setQuizData: handleSetQuizData }),
    [quizData],
  );

  return (
    <AdminCreatorContext.Provider value={contextValue}>
      {children}
    </AdminCreatorContext.Provider>
  );
};

export const useAdminCreator = () => {
  const { quizData, setQuizData } = useContext(AdminCreatorContext);

  return { quizData, setQuizData };
};
