import * as Schema from '@prisma/client';

export type Question = {
  answer: string;
} & Schema.Question;

export type Topic = {
  questions: Question[];
} & Schema.Topic;

export type Round = {
  id: number;
  topics: Topic[];
  name: string;
};

export type QuestionWithTeamAnswer = {
  teamAnswers: Schema.TeamAnswers[];
} & Schema.Question;

export type GameWithTopics = Schema.Game & { topics: number[] };
