import { AddIcon } from '@chakra-ui/icons';
import { Flex, FlexProps, Select, Text } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { StoreQuestion, StoreQuiz } from '../../../types';
import { generateRandomId } from '../../utils/common';
import SecondaryButton from '../buttons/secondary-button';
import CreatorQuestion from '../creator-question';

interface Props extends FlexProps {
  quizData: StoreQuiz;
  onQuizDataChange: (quizData: StoreQuiz) => void;
}

const generateQuestion = (): StoreQuestion => ({
  _id: generateRandomId(),
  content: '',
  answer: '',
  roundId: generateRandomId(),
});

export default function AdminQuizManageQuestionsForm({
  quizData,
  onQuizDataChange,
  ...props
}: Props) {
  const { rounds } = quizData;

  const [selectedRoundId, setSelectedRoundId] = useState<number>();
  const selectedRoundIndex = rounds.findIndex(
    (round) => round._id === selectedRoundId,
  );
  const selectedRound = rounds[selectedRoundIndex];

  const handleAddQuestion = () => {
    const resultRounds = [...rounds];
    resultRounds[selectedRoundIndex] = {
      ...resultRounds[selectedRoundIndex],
      questions: [
        ...resultRounds[selectedRoundIndex].questions,
        generateQuestion(),
      ],
    };

    onQuizDataChange({ ...quizData, rounds: resultRounds });
  };

  const handleSelectRound = (e: ChangeEvent<HTMLSelectElement>) => {
    const roundId = e.target.value === '' ? undefined : Number(e.target.value);

    setSelectedRoundId(roundId);

    if (roundId) {
      const roundIndex = rounds.findIndex((round) => round._id === roundId);

      if (rounds[roundIndex].questions.length) return;

      const resultRounds = [...rounds];
      resultRounds[roundIndex] = {
        ...resultRounds[roundIndex],
        questions: [generateQuestion()],
      };

      onQuizDataChange({ ...quizData, rounds: resultRounds });
    }
  };

  const handleQuestionChange = (
    question: StoreQuestion,
    questionIndex: number,
  ) => {
    const resultRounds = [...rounds];
    const resultRoundQuestions = [
      ...resultRounds[selectedRoundIndex].questions,
    ];
    resultRoundQuestions[questionIndex] = question;
    resultRounds[selectedRoundIndex] = {
      ...resultRounds[selectedRoundIndex],
      questions: resultRoundQuestions,
    };
    onQuizDataChange({ ...quizData, rounds: resultRounds });
  };

  return (
    <Flex direction="column" gap={4} {...props}>
      <Text>Round</Text>
      <Select
        placeholder="Select a round"
        value={selectedRoundId}
        onChange={handleSelectRound}
      >
        {rounds.map(({ name, _id }) => (
          <option key={_id} value={_id}>
            {name}
          </option>
        ))}
      </Select>
      {selectedRound &&
        selectedRound.questions.map((question, i) => (
          <CreatorQuestion
            key={question._id}
            title={`Question ${i + 1}`}
            question={question}
            onQuestionChange={(question) => handleQuestionChange(question, i)}
          />
        ))}
      {selectedRoundId && (
        <SecondaryButton
          testId="AdminAddQuestion_Button"
          size="sm"
          borderColor="secondary.100"
          color="secondary.100"
          alignSelf="end"
          leftIcon={<AddIcon />}
          onClick={handleAddQuestion}
        >
          Add question
        </SecondaryButton>
      )}
    </Flex>
  );
}
