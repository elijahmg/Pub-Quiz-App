import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, Select, Text } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import useCreatorStorage, {
  StoreQuestion,
  StoreRound,
} from '../../../hooks/use-creator-storage';
import { CreatorModeQuestion } from '../../../../types';
import SubHeader from '../../../components/headers/sub-header';
import CreatorQuestion from '../../../components/creator-question';
import SecondaryButton from '../../../components/buttons/secondary-button';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import RouteNavigation from '../../../components/route-navigation';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../../constants';

const QUESTION_PRESET = { content: '', answer: '' };

const Questions = () => {
  const { initialData, setData } = useCreatorStorage();

  const [rounds, setRounds] = useState<StoreRound[]>([]);

  // @FIXME This not ideal to do it by index but we dont have ids yet
  const [selectedRoundIndex, setSelectedRoundIndex] = useState(-1);

  const [questions, setQuestions] = useState<StoreQuestion[][]>();

  useEffect(() => {
    const rounds = initialData.rounds || [];
    setRounds(rounds);
    setQuestions(rounds.map((round) => round.questions ?? []));
  }, []);

  const handleSelectRound = (e: ChangeEvent<HTMLSelectElement>) => {
    const roundIndex = e.target.value === '' ? -1 : Number(e.target.value);

    setSelectedRoundIndex(roundIndex);

    if (roundIndex > -1) {
      setQuestions((currQuestions) => {
        if (currQuestions?.[roundIndex].length) return currQuestions;
        const resultQuestions = [...(currQuestions || [])];
        resultQuestions[roundIndex] = [QUESTION_PRESET];
        return resultQuestions;
      });
    }
  };

  const handleQuestionChange = (
    question: CreatorModeQuestion,
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
        { content: '', answer: '' },
      ];
      return resultQuestions;
    });
  };

  const onNavigate = () => {
    // @FIXME The data has to be stored at different times. Maybe on unmount?
    setData({
      ...initialData,
      rounds: rounds?.map((round, i) => ({
        ...round,
        questions: (questions || [])[i] ?? [],
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
        value={selectedRoundIndex}
        onChange={handleSelectRound}
      >
        {rounds.map(
          (round) =>
            round && (
              // @TODO use something like id for key/value
              <option key={round.name} value={round.name}>
                {round.name}
              </option>
            ),
        )}
      </Select>
      {questions?.[selectedRoundIndex]?.map((question, i) => (
        // @TODO use something like id for key
        <CreatorQuestion
          key={question.content}
          title={`Question ${i + 1}`}
          question={question}
          onQuestionChange={(question) => handleQuestionChange(question, i)}
        />
      ))}
      {selectedRoundIndex > -1 && (
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
