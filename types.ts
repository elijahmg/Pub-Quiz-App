import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export type Question = {
  id: number;
  content: string;
  answer: string;
  mediaType?: MediaType;
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

export type CreatorModeQuestion = Partial<Omit<Question, 'id'>>;

export interface Answer extends Question {
  points: number;
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
