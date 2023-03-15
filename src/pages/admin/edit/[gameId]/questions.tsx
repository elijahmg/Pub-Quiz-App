import { useState } from 'react';
import {
  Stack,
  Select,
  Heading,
  Input,
  Button,
  Box,
  Text,
  Divider,
} from '@chakra-ui/react';

interface QuizData {
  [id: number]: {
    question?: string;
    answer?: string;
  };
}

export default function EditQuestions() {
  const [questionData, setQuestionData] = useState<QuizData>({ 1: {} });

  const topics = [
    { id: '1', name: 'Topic 1' },
    { id: '2', name: 'Topic 2' },
    { id: '3', name: 'Topic 3' },
    { id: '4', name: 'Topic 4' },
  ];

  const [topic, setTopic] = useState(topics[0].id);

  function handleAddQuestion() {
    const lastKey = Object.keys(questionData).length;

    setQuestionData((prevState) => ({
      ...prevState,
      [lastKey + 1]: {},
    }));
  }

  function onQuestionChange(id: number, value: string) {
    setQuestionData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        question: value,
      },
    }));
  }

  function onAnswerChange(id: number, value: string) {
    setQuestionData((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        answer: value,
      },
    }));
  }

  return (
    <Stack>
      <Select
        color="pink.500"
        placeholder="Select option"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      >
        {topics.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
      <Heading as="h3">Add your question</Heading>
      {Object.keys(questionData).map((key) => (
        <Box key={key}>
          <Text>Question {key}</Text>
          <Input
            mb="4"
            placeholder="Type your question"
            value={questionData[Number(key)].question || ''}
            onChange={(e) => onQuestionChange(Number(key), e.target.value)}
          />
          <Input
            mb="4"
            placeholder="Type your answer"
            value={questionData[Number(key)].answer || ''}
            onChange={(e) => onAnswerChange(Number(key), e.target.value)}
          />
          <Divider />
        </Box>
      ))}

      <Button onClick={handleAddQuestion}>Add question +</Button>
      <Button>Save questions and go to the next topic</Button>
    </Stack>
  );
}
