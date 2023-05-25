import { POINTS_OPTIONS } from './constants';
import { QuizStatuses } from './src/server/types';
import { Question } from './types';

export const TEAM_NAME = 'Quirky Owls';

export const TEAMS = [
  { id: 1, name: 'Quirky Owls' },
  { id: 2, name: 'No habla cesky' },
  { id: 3, name: 'We want cupcakes!' },
];

export const QUESTIONS: Question[] = [
  {
    id: 1,
    content: 'What is the capital of Peru',
    answer: 'Lima',
    mediaType: null,
    mediaURL: null,
  },
];

export const QUESTIONS_WITH_POINTS = QUESTIONS.map((it, index) => ({
  ...it,
  points: Math.min(POINTS_OPTIONS[index] ?? Infinity, 1),
}));

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

export const QUIZ = {
  id: 1,
  name: 'The Amazing Quiz',
  pin: '1234',
  password: 'qwerty',
  rounds: ROUNDS,
  status: QuizStatuses.JOINING,
};
