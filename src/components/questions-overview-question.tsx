import {
  Input,
  Button,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react';
import { ChangeEvent, useState, useEffect } from 'react';
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
import { Question } from '../../types';
import SecondaryButton from './buttons/secondary-button';
import { useRouter } from 'next/router';
import { useUserStore } from './stores/user-store';
import { BOGUS_OBJECT } from '../../constants';
import { QuizStatuses } from '../server/types';

interface Props {
  question: Question;
  questionIndex: number;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

interface Props {
  question: Question;
  questionIndex: number;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

// @TODO Rename component/file
export default function QuestionsOverviewQuestion({
  question,
  questionIndex,
  answer,
  onAnswerChange,
}: Props) {
  const { content } = question;

  const router = useRouter();

  const userStore = useUserStore(({ quiz }) => ({ quiz }));

  const { status } = userStore.quiz ?? BOGUS_OBJECT;

  useEffect(() => {
    if (status === QuizStatuses.PLAYING) {
      router.push({ pathname: 'play', query: router.query });
    }

    // @TODO REMOVE
    setTimeout(() => {
      router.push({ pathname: 'play', query: router.query });
    }, 1000);
  }, [status]);

  const [isEditable, setIsEditable] = useState(false);

  const [value, setValue] = useState(answer);

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const toggleEditable = () => {
    setIsEditable((cur) => !cur);
  };

  const saveChange = () => {
    toggleEditable();
    onAnswerChange(value);
  };

  return (
    <FormControl as={Flex} flexDirection="column" gap={2}>
      <FormLabel>{`Q${questionIndex + 1}: ${content}`}</FormLabel>
      <InputGroup size="lg">
        <Input
          value={value}
          onChange={handleAnswerChange}
          readOnly={!isEditable}
          placeholder="Do you think you know the answer?"
        />
        {!isEditable ? (
          <InputRightElement width="auto" pr={2}>
            <Button
              leftIcon={<EditIcon />}
              size="xs"
              variant="ghost"
              onClick={toggleEditable}
            >
              Edit
            </Button>
          </InputRightElement>
        ) : null}
      </InputGroup>
      {isEditable ? (
        <SecondaryButton
          leftIcon={<CheckCircleIcon />}
          size="xs"
          alignSelf="end"
          onClick={saveChange}
        >
          Save change
        </SecondaryButton>
      ) : null}
    </FormControl>
  );
}
