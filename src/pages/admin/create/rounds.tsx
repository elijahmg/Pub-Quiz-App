import { CloseIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, KeyboardEvent, ReactElement, useState } from 'react';
import SubHeader from '../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../components/wrappers/admin-creator-wrapper';
import RouteNavigation from '../../../components/route-navigation';
import { ADMIN_CREATE_ROUTE_LIST } from '../../../../constants';
import { generateRandomId } from '../../../utils/common';
import { StoreRound } from '../../../../types';
import { useAdminCreator } from '../../../components/contexts/admin-creator-context';

const Rounds = () => {
  const { quizData, setQuizData } = useAdminCreator();

  const [roundName, setRoundName] = useState('');
  const [rounds, setRounds] = useState<StoreRound[]>(quizData.rounds);

  const handleRoundNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoundName(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.code === 'Enter' &&
      !rounds.find((round) => round.name === roundName)
    ) {
      setRounds((currRounds) => [
        ...currRounds,
        { _id: generateRandomId(), name: roundName, questions: [] },
      ]);
      setRoundName('');
    }
  };

  const handleRoundRemove = (roundIndex: number) => {
    setRounds((currRounds) => {
      const resultRounds = [...currRounds];
      resultRounds.splice(roundIndex, 1);
      return resultRounds;
    });
  };

  const onNavigate = () => {
    // @FIXME The data has to be stored at different times. Maybe on unmount?
    setQuizData({ ...quizData, rounds });
  };

  return (
    <Flex direction="column" gap={4} flexGrow={1}>
      <Heading as="h3" size="sm" color="#A0A2A4">
        Creating a new quiz
      </Heading>
      <SubHeader>Rounds</SubHeader>
      <Text>Please add your name of the round</Text>
      <Input
        value={roundName}
        placeholder="E.g.: World Leaders"
        onChange={handleRoundNameChange}
        onKeyDown={handleKeyPress}
        size="lg"
      />
      <Text>Rounds created</Text>
      <InputGroup>
        <InputLeftElement
          width="auto"
          height="100%"
          alignItems="center"
          px={2}
          gap={2}
        >
          {rounds.map(({ _id, name }, i) => (
            <Tag
              key={_id}
              bgColor="green.100"
              color="white"
              borderRadius="6px"
              size="lg"
            >
              <TagLeftIcon
                boxSize="12px"
                as={CloseIcon}
                onClick={() => handleRoundRemove(i)}
                cursor="pointer"
              />
              <TagLabel>{name}</TagLabel>
            </Tag>
          ))}
        </InputLeftElement>
        <Input size="lg" />
      </InputGroup>
      <RouteNavigation
        routeList={ADMIN_CREATE_ROUTE_LIST}
        onNavigate={onNavigate}
      />
    </Flex>
  );
};

Rounds.getLayout = function getLayout(pageContent: ReactElement) {
  return <AdminCreatorWrapper>{pageContent}</AdminCreatorWrapper>;
};

export default Rounds;
