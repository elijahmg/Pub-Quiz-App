import {
  Button,
  Stack,
  Heading,
  Text,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

export default function AnswersCheck() {
  // TODO: USE REAL DATA THEN
  const questions = [
    {
      id: 1,
      content: 'Where is John',
      answer: 'here',
    },
    {
      id: 2,
      content: 'Where is Johnny',
      answer: 'there',
    },
    {
      id: 3,
      content: 'Where is Johnny Cash',
      answer: 'everywhere',
    },
  ];

  const resultList = {};
  questions.forEach((question) => resultList[question.id] = '0');

  const [sum, setSum] = useState(0);
  const [results, setResults] = useState(resultList);

  const updatePoints = (value: string, questionIndex: number) => {
    results[questionIndex] = value;
    setResults(results);
    const updatedSum = Object.values(results).reduce(
      (a: any, b: any): number =>
        Number(a) + Number(b),
      0,
    ) as number;
    setSum(updatedSum);
  };

  function RadioComponent(props: any) {
    return (
      <RadioGroup
        value={results[props.questionIndex]}
        onChange={(value) => updatePoints(value, props.questionIndex)}
      >
        <Stack>
          <Radio value="1">1</Radio>
          <Radio value="0.5">0.5</Radio>
          <Radio value="0">0</Radio>
        </Stack>
      </RadioGroup>
    );
  }

  return (
    <Stack>
      <Stack>
        <Heading as="h2">Team name</Heading>
        {questions.map(({ content, id, answer }) => (
          <React.Fragment key={id}>
            <Text>
              Question {id}: {content}. Answer: {answer}
            </Text>
            <RadioComponent questionIndex={id} />
          </React.Fragment>
        ))}
        <Text>Total {sum}</Text>
      </Stack>
      <Button>Back to Overview</Button>
      <Button>Next team</Button>
    </Stack>
  );
}
