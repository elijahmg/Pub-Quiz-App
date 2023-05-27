import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import type { Question, MediaTypeEnum, Round, Quiz } from '.prisma/client';

export interface Answer extends Question {
  points: number;
}

export type StoreQuestion = Required<
  Omit<Question, 'id' | 'mediaType' | 'mediaURL'>
> & {
  _id: number;
  mediaType?: MediaTypeEnum;
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
