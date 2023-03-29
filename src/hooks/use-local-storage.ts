import { isCSR } from '../utils/common';

const useLocalStorage = (storageKey: string) => {
  const getDataFromLocalStorage = () => {
    let data;

    if (isCSR()) {
      try {
        const dataString = localStorage.getItem(storageKey);
        if (dataString) data = JSON.parse(dataString);
      } catch (e) {
        console.error(e);
      }
    }

    return data;
  };

  const setDataToLocalStorage = (data: Record<string, unknown>) => {
    if (isCSR()) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(data));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return { getDataFromLocalStorage, setDataToLocalStorage };
};

export default useLocalStorage;
