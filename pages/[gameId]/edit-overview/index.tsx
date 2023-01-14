import { Badge, Box, Flex, Input, Spacer, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import QuizHead from "../../../components/headers/quiz-head";

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
  {
    number: 6,
    answer: '6',
  },
  {
    number: 7,
    answer: '7',
  },
  {
    number: 8,
    answer: '8',
  },
  {
    number: 9,
    answer: '9',
  },
];

const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
  questions[index].answer = e.target.value;
  console.log(questions);
};

function QuestionList() {
  return (
    <Stack spacing={4}>
      {questions.map((question, index) => (
        <Box key={index}>
          <Text>Q{question.number}: some question text?</Text>
          <Input
            placeholder="Enter the answer"
            defaultValue={question.answer}
            onChange={(e) => handleChange(e, index)}
          />
        </Box>
      ))}
    </Stack>
  );
}

export default function Page() {
  return (
    <Box p={4}>
      <QuizHead teamName="teamName" round="1" topicName="topicName" />
      <QuestionList />
    </Box>
  );
}
