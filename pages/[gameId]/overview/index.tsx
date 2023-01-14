import {
  Text,
  Box,
  Stack,
  Input,
  InputRightElement,
  InputGroup,
  Flex,
} from '@chakra-ui/react';
import QuizHead from '../../../components/headers/quiz-head';
import { DragHandleIcon } from '@chakra-ui/icons';
import SubHeader from '../../../components/headers/SubHeader';
import Header from '../../../components/headers/Header';

interface Answer {
  number: number;
  answer: string;
  points: number;
  question: string;
}

const answers = [
  {
    number: 1,
    answer: '1',
    points: 0,
    question: 'q',
  },
  {
    number: 2,
    answer: '2',
    points: 1,
    question: 'q',
  },
  {
    number: 3,
    answer: '3',
    points: 1,
    question: 'q',
  },
  {
    number: 4,
    answer: '4',
    points: 0,
    question: 'q',
  },
  {
    number: 5,
    answer: '5',
    points: 0.5,
    question: 'q',
  },
  {
    number: 6,
    answer: '6',
    points: 1,
    question: 'q',
  },
  {
    number: 7,
    answer: '7',
    points: 1,
    question: 'q',
  },
  {
    number: 8,
    answer: '8',
    points: 1,
    question: 'q',
  },
  {
    number: 9,
    answer: '9',
    points: 1,
    question: 'q',
  },
];

export default function Overview() {
  function calculateSum(array: Answer[]) {
    return array.reduce((accumulator, object) => {
      return accumulator + object['points'];
    }, 0);
  }

  interface Props {
    answers: Answer[];
  }

  function QuestionList({ answers }: Props) {
    return (
      <Stack spacing={4}>
        {answers.map((answer: Answer, index: number) => (
          <Box key={index}>
            <Text>
              Q{answer.number}: {answer.question}
            </Text>

            <InputGroup size="md">
              <Input
                disabled
                placeholder="Enter the answer"
                defaultValue={answer.answer}
              />
              <InputRightElement width="auto">
                <Text color={answer.points === 1 ? 'green.100' : 'brand.900'}>
                  1pct&nbsp;
                </Text>
                <Text color={answer.points === 0.5 ? 'green.100' : 'brand.900'}>
                  0.5pct&nbsp;
                </Text>
                <Text color={answer.points === 0 ? 'red.100' : 'brand.900'}>
                  0pct&nbsp;
                </Text>
              </InputRightElement>
            </InputGroup>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Box p={4}>
      <QuizHead teamName="teamName" round="1" topicName="topicName" />
      <QuestionList answers={answers} />

      <Box p={4} pt={10}>
        <Flex alignItems="center" flexDirection="column">
          <SubHeader>This Round’s Score</SubHeader>
          <Header>{calculateSum(answers).toString()}</Header>
        </Flex>
      </Box>
      <hr />
      <Box p={4}>
        <Flex alignItems="center" flexDirection="column">
          <SubHeader>Totol score</SubHeader>
          <Text color={'green.100'}>50</Text>
        </Flex>
      </Box>
    </Box>
  );
}
