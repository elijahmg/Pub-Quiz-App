import React, { createContext, ReactNode, useContext, useState } from 'react';
import { StoreQuiz } from '../../../types';

const QUIZ_PRESET: StoreQuiz = {
  name: '',
  pin: '',
  password: '',
  rounds: [],
  quizStatusId: -1,
};

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
