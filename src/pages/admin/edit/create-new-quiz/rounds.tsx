import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
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
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import SubHeader from '../../../../components/headers/sub-header';
import { AdminCreatorWrapper } from '../../../../components/wrappers/admin-creator-wrapper';
import { ROUNDS } from '../../../../../mock-data';
import { useRouter } from 'next/router';

const Rounds = () => {
  const router = useRouter();

  const [roundName, setRoundName] = useState('');
  const [rounds, setRounds] = useState<string[]>(ROUNDS.map((it) => it.name));

  const handleRoundNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoundName(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && !rounds.includes(roundName)) {
      setRounds((currRounds) => [...currRounds, roundName]);
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

  const handlePrevious = () => {
    router.back();
  };

  const handleNext = () => {
    console.log({ rounds });
    router.push('questions');
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
          {rounds.map((round, index) => (
            <Tag
              key={index}
              bgColor="green.100"
              color="white"
              borderRadius="6px"
              size="lg"
            >
              <TagLeftIcon
                boxSize="12px"
                as={CloseIcon}
                onClick={() => handleRoundRemove(index)}
              />
              <TagLabel>{round}</TagLabel>
            </Tag>
          ))}
        </InputLeftElement>
        <Input size="lg" />
      </InputGroup>
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

Rounds.getLayout = function getLayout(pageContent: React.ReactElement) {
  return (
    <AdminCreatorWrapper minHeight="100vh">{pageContent}</AdminCreatorWrapper>
  );
};

export default Rounds;
