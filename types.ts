import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export enum MediaTypes {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export type Question = {
  id: number;
  content: string;
  answer: string;
  mediaType?: MediaTypes;
  mediaURL?: string;
};

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

export type StoreQuiz = Required<Omit<Quiz, 'rounds' | 'id'>> & {
  rounds: StoreRound[];
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
