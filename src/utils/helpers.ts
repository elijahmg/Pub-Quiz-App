export const calculatePoints = (scores: number[]) => {
  return scores.reduce((total, score) => {
    return total + (score || 0);
  }, 0);
};
