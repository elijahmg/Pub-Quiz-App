export type Question = {
  id: number;
  content: string;
  answer: string;
  // media?: any;
};

export interface Answer extends Question {
  points: number;
}
