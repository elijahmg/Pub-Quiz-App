import * as Schema from '@prisma/client';

export type QuestionWithAnswer = {
  answer: string;
} & Schema.Question;

export type TopicWithQuestions = {
  questions: QuestionWithTeamAnswer[] | Schema.Question[];
} & Schema.Topic;

export type QuestionWithTeamAnswer = {
  teamAnswers: Schema.TeamAnswers[];
} & Schema.Question;

export type TeamWithAnswers = {
  answers: Schema.TeamAnswers[];
} & Schema.Team;

export type GameWithTeams = Schema.Game & { teams: TeamWithAnswers[] };

export type GameWithTopics = Schema.Game & { topics: TopicWithQuestions[] };
