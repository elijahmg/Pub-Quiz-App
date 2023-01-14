export type Question = {
  id: number;
  content: string;
  answer: string;
};

export type Topic = {
  id: number;
  name: string;
  questions: Question[];
};

export type Round = {
  id: number;
  topics: Topic[];
  name: string;
};
