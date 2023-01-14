import { Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

const teamName = 'TeamName';
const questions = [
  {
    number: 1,
    answer: '1',
  },
  {
    number: 2,
    answer: '2',
  },
  {
    number: 3,
    answer: '3',
  },
  {
    number: 4,
    answer: '4',
  },
  {
    number: 5,
    answer: '5',
  },
];

const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
  questions[index].answer = e.target.value;
  console.log(questions);
}

function TeamName() {
  return <Text>{teamName}</Text>;
}

function QuestionList() {
  return <Stack spacing={4}>
    {questions.map((question, index) => (
      <Input
        key={index}
        placeholder="Enter the answer"
        defaultValue={question.answer}
        onChange={(e) => handleChange(e, index)}
      />
    ))}
  </Stack>
}

export default function Page() {
  return <div>
    <TeamName/>
    <QuestionList/>
  </div>
}
