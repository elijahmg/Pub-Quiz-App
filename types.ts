import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { MediaTypes, QuizStatuses } from './src/server/types';

export type Question = {
  id: number;
  content: string;
  answer: string;
  mediaType: MediaTypes | null;
  mediaURL: string | null;
};

export interface QuizStatus {
  id: number;
}

export interface Round {
  id: number;
  name: string;
  questions: Question[];
}

export interface Quiz {
  id: number;
  name: string;
  pin: string;
  password: string;
  rounds: Round[];
  status: QuizStatuses;
}

export interface Team {
  id: number;
  name: string;
}

export interface Answer extends Question {
  points: number;
}

export type StoreQuestion = Required<
  Omit<Question, 'id' | 'mediaType' | 'mediaURL'>
> & {
  _id: number;
  mediaType?: MediaTypes;
  mediaURL?: string;
};

export type StoreRound = Required<Omit<Round, 'questions' | 'id'>> & {
  questions: StoreQuestion[];
  _id: number;
};

export type StoreQuiz = Required<Omit<Quiz, 'rounds' | 'id' | 'status'>> & {
  rounds: StoreRound[];
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
