import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Team } from '.prisma/client';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trcp';
import {
  useAdminQuizDataState,
  QuizData,
} from '../../state/admin/admin-quiz-data.state';
import useResponseToast from '../../hooks/use-response-toast';

interface AdminQuizControlContextType {
  quiz: QuizData;
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
  const { query } = useRouter();

  const { handleTRPCError } = useResponseToast();

  const { quizData, setQuizData } = useAdminQuizDataState((state) => ({
    quizData: state.quizData,
    setQuizData: state.setQuizData,
  }));

  const { isLoading: isFullQuizDataLoading } =
    trpc.admin.getFullQuizData.useQuery(
      {
        quizId: Number(query.quizId),
      },
      {
        enabled: !!query.quizId,
        onSuccess: (data: QuizData) => handleOnSuccessGetFullQuizData(data),
        onError: handleTRPCError,
      },
    );

  const handleOnSuccessGetFullQuizData = (quizData: QuizData | null) => {
    if (!quizData) return;

    const { quizStatus, rounds } = quizData;
    const { currentQuestion } = quizStatus;
    const { roundId, id } = currentQuestion;

    setQuizData(quizData);

    const roundIndex = rounds.findIndex((round) => round.id === roundId);
    setRoundIndex(roundIndex);

    const questionIndex = rounds[roundIndex].questions.findIndex(
      (question) => question.id === id,
    );
    setQuestionIndex(questionIndex);
  };

  // Parsing is forced here, since we have security on line 77
  const quiz = { ...quizData } as QuizData;

  const teams = [] as Team[];

  const [roundIndex, setRoundIndex] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);

  const handleSetRoundIndex = (roundIndex: number) => {
    setRoundIndex(roundIndex);
  };

  const handleSetQuestionIndex = (questionIndex: number) => {
    setQuestionIndex(questionIndex);
  };

  const contextValue = {
    quiz,
    teams,
    roundIndex,
    setRoundIndex: handleSetRoundIndex,
    questionIndex,
    setQuestionIndex: handleSetQuestionIndex,
  };

  if (isFullQuizDataLoading) return null;

  return (
    <AdminQuizControlContext.Provider value={contextValue}>
      {children}
    </AdminQuizControlContext.Provider>
  );
};

export const useAdminQuizControlContext = () => {
  return useContext(AdminQuizControlContext)!;
};
