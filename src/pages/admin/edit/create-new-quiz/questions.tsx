import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import SubHeader from '../../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../../components/wrappers/admin-creator-wrapper';
import { useRouter } from 'next/router';
import CreatorQuestion from '../../../../components/creator-question';
import { CreatorModeQuestion } from '../../../../../types';

const Questions = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState([{ content: '', answer: '' }]);

  const getHandleQuestionChange = (questionIndex: number) => {
    return (question: CreatorModeQuestion) => {
      setQuestions((currQuestions) => {
        const resultQuestions = [...currQuestions];
        resultQuestions[questionIndex] = question;
        return resultQuestions;
      });
    };
  };

  const handleAddQuestion = () => {
    setQuestions((currQuestions) => [
      ...currQuestions,
      { content: '', answer: '' },
    ]);
  };

  const handlePrevious = () => {
    router.back();
  };

  const handleNext = () => {
    console.log({ questions });
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Questions</SubHeader>
      <Heading as="h3" size="md" color="secondary.100">
        Round 1
      </Heading>
      {questions.map((question, i) => (
        <CreatorQuestion
          key={i}
          title={`Question ${i + 1}`}
          question={question}
          onQuestionChange={getHandleQuestionChange(i)}
        />
      ))}
      <Button
        size="sm"
        variant="outline"
        borderColor="secondary.100"
        color="secondary.100"
        alignSelf="end"
        leftIcon={<AddIcon />}
        onClick={handleAddQuestion}
      >
        Add question
      </Button>

      <Flex gap={2} mt="auto" alignSelf="end">
        <Button
          size="lg"
          variant="outline"
          borderColor="secondary.100"
          color="secondary.100"
          leftIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
        >
          Previous step
        </Button>
        <Button
          size="lg"
          variant="outline"
          borderColor="secondary.100"
          color="secondary.100"
          rightIcon={<ArrowForwardIcon />}
          onClick={handleNext}
        >
          Next step
        </Button>
      </Flex>
    </Flex>
  );
};

Questions.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <AdminCreatorWrapper minHeight="100vh">{pageContent}</AdminCreatorWrapper>
  );
};

export default Questions;
