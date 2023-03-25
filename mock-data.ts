import { POINTS_OPTIONS } from './constants';

export const TEAM_NAME = 'Quirky Owls';

export const QUESTIONS = [
  {
    id: 1,
    content: 'What is the capital of Peru',
    answer: 'Lima',
  },
  {
    id: 2,
    content: 'What is the capital of Brazil',
    answer: 'Brasillia',
  },
  {
    id: 3,
    content: 'What is the capital of Czech Republic',
    answer: 'Prague',
  },
  {
    id: 4,
    content: 'What is the capital of Slovakia',
    answer: 'Bratislava',
  },
  {
    id: 5,
    content: 'What is the capital of Tonga',
    answer: 'Sofia',
  },
];

export const ROUNDS = [
  {
    id: 1,
    name: 'First round',
    questions: QUESTIONS,
  },
  {
    id: 2,
    name: 'Second round',
    questions: QUESTIONS,
  },
];

export const QUESTIONS_WITH_POINTS = QUESTIONS.map((it, index) => ({
  ...it,
  points: Math.min(POINTS_OPTIONS[index] ?? Infinity, 1),
}));

export const QUIZ = {
  name: 'The Amazing Quiz',
  pin: '1234',
  password: 'qwerty',
};
