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

  const contextValue = useMemo(
    () => ({ quizData, setQuizData: handleSetQuizData }),
    [quizData],
  );

  return (
    <AdminQuizManageContext.Provider value={contextValue}>
      {children}
    </AdminQuizManageContext.Provider>
  );
};

export const useAdminQuizManageContext = () => {
  const { quizData, setQuizData } = useContext(AdminQuizManageContext);

  return { quizData, setQuizData };
};
