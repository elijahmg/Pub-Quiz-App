import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  AccordionIcon,
  Heading,
  Stack,
  Button,
} from '@chakra-ui/react';

interface Question {
  id: string;
  content: string;
  answer: string;
}

interface AccordionDataProps {
  title: string;
  questions: Question[];
}

function AccordionData({ title, questions }: AccordionDataProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {questions.map((question) => (
          <Box key={question.id}>
            <Text as="b" fontSize="lg">
              Question
            </Text>
            <Text>{question.content}</Text>
            <Text as="b" fontSize="lg">
              Answer
            </Text>
            <Text mb="6">{question.answer}</Text>
          </Box>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default function Review() {
  const quizData = {
    id: '1',
    name: 'Quiz name',
    topics: [
      {
        id: '1',
        name: 'Music',
        questions: [
          {
            id: '1',
            content: "Who's Joe",
            answer: 'Nobody',
          },
        ],
      },
      {
        id: '2',
        name: 'Movie',
        questions: [
          {
            id: '1',
            content: "Who's Joe",
            answer: 'Nobody',
          },
          {
            id: '2',
            content: "Who's Vojta",
            answer: 'The Boss',
          },
        ],
      },
    ],
  };

  return (
    <Stack>
      <Heading as="h2">{quizData.name}</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        {quizData.topics.map((topic) => (
          <AccordionData
            key={topic.id}
            questions={topic.questions}
            title={topic.name}
          />
        ))}
      </Accordion>
      <Button>Start joining</Button>
    </Stack>
  );
}
