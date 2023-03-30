import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { QUIZ, TEAMS } from '../../../mock-data';
import { Quiz, Team } from '../../../types';

interface AdminQuizControlContextType {
  quiz: Quiz;
  teams: Team[];
  roundIndex: number;
  setRoundIndex: (roundIndex: number) => void;
  questionIndex: number;
  setQuestionIndex: (questionIndex: number) => void;
}

const AdminQuizControlContext =
  createContext<AdminQuizControlContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const AdminQuizControlContextWrapper = ({ children }: Props) => {
  const quiz = QUIZ;

  const teams = TEAMS;

  const [roundIndex, setRoundIndex] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);

  const handleSetRoundIndex = (roundIndex: number) => {
    setRoundIndex(roundIndex);
  };

  const handleSetQuestionIndex = (questionIndex: number) => {
    setQuestionIndex(questionIndex);
  };

  const contextValue = useMemo(
    () => ({
      quiz,
      teams,
      roundIndex,
      setRoundIndex: handleSetRoundIndex,
      questionIndex,
      setQuestionIndex: handleSetQuestionIndex,
    }),
    [questionIndex, quiz, roundIndex, teams],
  );

  return (
    <AdminQuizControlContext.Provider value={contextValue}>
      {children}
    </AdminQuizControlContext.Provider>
  );
};

export const useAdminQuizControlContext = () => {
  return useContext(AdminQuizControlContext)!;
};
