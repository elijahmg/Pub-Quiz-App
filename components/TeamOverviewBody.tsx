import { Td, Tr } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import * as QuestionComponent from './Question';
import { QuestionWithTeamAnswer } from '../types/main';

export default function TeamOverviewBody({
  questions,
  allowEdit,
}: {
  questions?: QuestionWithTeamAnswer[];
  allowEdit: boolean;
}) {
  const [allQuestions, setAllQuestions] = useState(
    questions ?? ([] as QuestionWithTeamAnswer[]),
  );

  const onHandleAnswer = useCallback(
    (answer: string, id: number) => {
      setAllQuestions((oldQuestions) =>
        oldQuestions.map((question) =>
          question.id === id ? { ...question, answer } : question,
        ),
      );
    },
    [setAllQuestions],
  );

  return (
    <>
      {allQuestions.map((question) => {
        return (
          <Tr key={question.id}>
            <Td>
              <QuestionComponent.default
                question={question}
                handleAnswer={onHandleAnswer}
                allowEdit={allowEdit}
              />{' '}
            </Td>
            <Td>
              {question.teamAnswers?.find(
                ({ questionId }) => questionId === question.id,
              )?.score ?? 0}
            </Td>
          </Tr>
        );
      })}
    </>
  );
}
