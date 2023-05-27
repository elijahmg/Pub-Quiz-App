import { CloseIcon } from '@chakra-ui/icons';
import {
  Flex,
  FlexProps,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { StoreQuiz } from '../../../types';
import { generateRandomId } from '../../utils/common';

interface Props extends FlexProps {
  quizData: StoreQuiz;
  onQuizDataChange: (quizData: StoreQuiz) => void;
}

export default function AdminQuizManageRoundsForm({
  quizData,
  onQuizDataChange,
  ...props
}: Props) {
  const { rounds } = quizData;

  const [roundName, setRoundName] = useState('');

  const handleRoundNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoundName(e.target.value);
  };

  const handleRoundNameKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.code !== 'Enter' ||
      rounds.find((round) => round.name === roundName)
    ) {
      return;
    }

    onQuizDataChange({
      ...quizData,
      rounds: [
        ...rounds,
        { _id: generateRandomId(), name: roundName, questions: [], quizId: -1 },
      ],
    });

    setRoundName('');
  };

  const handleRoundRemove = (roundIndex: number) => {
    const resultRounds = [...rounds];
    resultRounds.splice(roundIndex, 1);

    onQuizDataChange({ ...quizData, rounds: resultRounds });
  };

  return (
    <Flex direction="column" gap={4} {...props}>
      <Text>Please add your name of the round</Text>
      <Input
        value={roundName}
        placeholder="E.g.: World Leaders"
        onChange={handleRoundNameChange}
        onKeyDown={handleRoundNameKeyPress}
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
    </Flex>
  );
}
