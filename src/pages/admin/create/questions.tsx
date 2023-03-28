import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, Select, Text } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import useCreatorStorage from '../../../hooks/use-creator-storage';
import SubHeader from '../../../components/headers/sub-header';
import CreatorQuestion from '../../../components/creator-question';
import SecondaryButton from '../../../components/buttons/secondary-button';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import RouteNavigation from '../../../components/route-navigation';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../../constants';
import { generateRandomId } from '../../../utils/common';
import { StoreQuestion, StoreRound } from '../../../../types';

const generateQuestion = (): StoreQuestion => ({
  _id: generateRandomId(),
  content: '',
  answer: '',
  mediaType: '',
  mediaURL: '',
});

const Questions = () => {
  const { initialData, setData } = useCreatorStorage();

  const [rounds, setRounds] = useState<StoreRound[]>([]);

  const [selectedRoundId, setSelectedRoundId] = useState<number>();
  const selectedRoundIndex = rounds.findIndex(
    (round) => round._id === selectedRoundId,
  );

  const [questions, setQuestions] = useState<StoreQuestion[][]>();

  useEffect(() => {
    const rounds = initialData.rounds || [];
    setRounds(rounds);
    setQuestions(rounds.map((round) => round.questions ?? []));
  }, []);

  const handleSelectRound = (e: ChangeEvent<HTMLSelectElement>) => {
    const roundId = e.target.value === '' ? undefined : Number(e.target.value);

    setSelectedRoundId(roundId);

    if (roundId) {
      const roundIndex = rounds.findIndex((round) => round._id === roundId);

      setQuestions((currQuestions) => {
        if (currQuestions?.[roundIndex].length) return currQuestions;
        const resultQuestions = [...(currQuestions || [])];
        resultQuestions[roundIndex] = [generateQuestion()];
        return resultQuestions;
      });
    }
  };

  const handleQuestionChange = (
    question: StoreQuestion,
    questionIndex: number,
  ) => {
    setQuestions((currQuestions) => {
      const resultQuestions = [...(currQuestions || [])];
      resultQuestions[selectedRoundIndex] = [
        ...resultQuestions[selectedRoundIndex],
      ];
      resultQuestions[selectedRoundIndex][questionIndex] = question;
      return resultQuestions;
    });
  };

  const handleAddQuestion = () => {
    setQuestions((currQuestions) => {
      const resultQuestions = [...(currQuestions || [])];
      resultQuestions[selectedRoundIndex] = [
        ...resultQuestions[selectedRoundIndex],
        generateQuestion(),
      ];
      return resultQuestions;
    });
  };

  const onNavigate = () => {
    // @FIXME The data has to be stored at different times. Maybe on unmount?
    setData({
      ...initialData,
      rounds: rounds.map((round, i) => ({
        ...round,
        questions: (questions || [[]])[i],
      })),
    });
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Questions</SubHeader>
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
      {questions?.[selectedRoundIndex]?.map((question, i) => (
        <CreatorQuestion
          key={question._id}
          title={`Question ${i + 1}`}
          question={question}
          onQuestionChange={(question) => handleQuestionChange(question, i)}
        />
      ))}
      {selectedRoundId && (
        <SecondaryButton
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
      <RouteNavigation
        routeList={ADMIN_CREATE_ROUTE_LIST}
        onNavigate={onNavigate}
      />
    </Flex>
  );
};

Questions.getLayout = function getLayout(pageContent: React.ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default Questions;
