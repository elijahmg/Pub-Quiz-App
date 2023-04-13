import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { StoreQuiz } from '../../../types';

const QUIZ_PRESET = { name: '', pin: '', password: '', rounds: [] };

interface AdminQuizManageContextType {
  quizData: StoreQuiz;
  setQuizData: (quizData: StoreQuiz) => void;
}

const AdminQuizManageContext = createContext<AdminQuizManageContextType>({
  quizData: QUIZ_PRESET,
  setQuizData: () => undefined,
});

interface Props {
  children: ReactNode;
}

export const AdminQuizManageContextWrapper = ({ children }: Props) => {
  const [quizData, setQuizData] = useState<StoreQuiz>(QUIZ_PRESET);

  const handleSetQuizData = (quizData: StoreQuiz) => {
    setQuizData(quizData);
  };

  return (
    <AdminQuizManageContext.Provider
      value={{ quizData, setQuizData: handleSetQuizData }}
    >
      {children}
    </AdminQuizManageContext.Provider>
  );
};

export const useAdminQuizManageContext = () => {
  return useContext(AdminQuizManageContext);
};
