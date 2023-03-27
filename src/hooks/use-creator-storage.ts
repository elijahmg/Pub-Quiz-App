import { useMemo, useState } from 'react';
import type { Quiz, Round, Question } from '../../types';
import { isCSR } from '../utils/common';

const STORAGE_KEY = 'pubQuizApp-admin-createQuiz';

export type StoreQuestion = Partial<Question>;
export type StoreRound = Partial<Omit<Round, 'questions'>> & {
  questions?: StoreQuestion[];
};
export type StoreQuiz = Partial<Omit<Quiz, 'rounds'>> & {
  rounds?: StoreRound[];
};

const normalizeQuiz = (data: Partial<StoreQuiz>) => {
  let rounds = data.rounds ?? [];

  if (Array.isArray(rounds)) {
    rounds = rounds.map((round) => ({
      ...round,
      questions: round.questions ?? [],
    }));
  }

  return { ...data, rounds };
};

const useCreatorStorage = () => {
  const getData = (): StoreQuiz => {
    let data = {};

    try {
      if (isCSR()) {
        const dataString = localStorage.getItem(STORAGE_KEY);
        if (dataString) data = JSON.parse(dataString);
      }
    } catch (e) {
      console.error(e);
    }

    return normalizeQuiz(data);
  };

  const setData = (data: StoreQuiz) => {
    const normalizedData = normalizeQuiz(data);

    try {
      if (isCSR()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedData));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [initialData] = useState<StoreQuiz>(getData);

  const data = useMemo(() => getData(), []);

  return { initialData, data, getData, setData };
};

export default useCreatorStorage;
