import TeamName from '../../../components/TeamName';
import { Heading, VStack, Button, Input, Box, Text } from '@chakra-ui/react';

interface QuizProps {
  quizName: string;
  password: string;
  usePin: number;
  numberOfRounds: number;
  topics: string[];
  questions: string[];
}

export default function CreateNewQuiz(name: string) {
  function createQuiz(elements: QuizProps) {
    //
    console.log(elements);
  }

  function addQuestion(question: string) {
    console.log(question);
  }

  return (
    <VStack>
      <TeamName name={'Team name placeholder'} />
      <Heading size={'xl'}>Create new quiz</Heading>
      <Box>
        <Text>Name of the quiz: </Text>
        <Input placeholder="Basic usage" />
      </Box>
      <Box>
        <Text>Add password: </Text>
        <Input placeholder="Basic usage" />
      </Box>
      <Box>
        <Text>Add PIN for users: </Text>
        <Input placeholder="Basic usage" />
      </Box>
      <Box>
        <Text>Number of rounds: </Text>
        <Input placeholder="Basic usage" />
      </Box>
      <Box>
        <Text>Topics: </Text>
        <Input placeholder="Basic usage" />
      </Box>
      <Box>
        <Text>Questions: </Text>
        <Input placeholder="Basic usage" />
      </Box>
      <Button onClick={createQuiz()}>Start creating quiz!</Button>
    </VStack>
  );
}
