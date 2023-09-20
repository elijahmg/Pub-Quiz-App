import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FlexProps,
  Input,
  Text,
} from '@chakra-ui/react';
import { StoreQuiz } from '../../../types';
import CreatorQuestion from '../creator-question';
import CSRWrapper from '../csr-wrapper';
import SubHeader from '../headers/sub-header';

interface Props extends FlexProps {
  quizData: StoreQuiz;
}

export default function AdminQuizManageFinalOverview({
  quizData,
  ...props
}: Props) {
  const { name, password, pin, rounds } = quizData;

  return (
    <Flex direction="column" gap={4} {...props}>
      <SubHeader size="md">Main info</SubHeader>
      <Text>Quiz name</Text>
      <Input
        data-testid="AdminQuizFinalCheck_QuizName"
        value={name}
        isReadOnly
      />
      <Text>Quiz password</Text>
      <Input
        data-testid="AdminQuizFinalCheck_QuizPassword"
        value={password}
        isReadOnly
      />
      <Text>Quiz PIN</Text>
      <Input data-testid="AdminQuizFinalCheck_QuizPIN" value={pin} isReadOnly />
      <CSRWrapper>
        {rounds.length > 0 && (
          <Accordion allowToggle>
            {rounds.map(({ _id, name, questions }, i) => (
              <AccordionItem key={_id}>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      data-testid="AdminQuizFinalCheck_RoundBox"
                    >
                      {`Round ${i + 1} Questions`}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Text>Name of this round</Text>
                  <Input
                    data-testid="AdminQuizFinalCheck_RoundName"
                    value={name}
                    isReadOnly
                  />
                  {questions.map((question, i) => (
                    <CreatorQuestion
                      key={question._id}
                      title={`Question ${i + 1}`}
                      question={question}
                      isReadOnly
                    />
                  ))}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CSRWrapper>
    </Flex>
  );
}
