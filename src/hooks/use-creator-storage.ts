import { useMemo, useState } from 'react';
import type { StoreQuiz } from '../../types';
import { isCSR } from '../utils/common';

const STORAGE_KEY = 'pubQuizApp-admin-createQuiz';

const QUIZ_PRESET = { name: '', pin: '', password: '', rounds: [] };

const useCreatorStorage = () => {
  const getData = (): StoreQuiz => {
    let data = QUIZ_PRESET;

    if (isCSR()) {
      try {
        const dataString = localStorage.getItem(STORAGE_KEY);
        if (dataString) data = JSON.parse(dataString);
      } catch (e) {
        console.error(e);
      }
    }

    return data;
  };

  const setData = (data: StoreQuiz) => {
    if (isCSR()) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const [initialData] = useState<StoreQuiz>(getData);

  return { initialData, getData, setData };
};

export default useCreatorStorage;
