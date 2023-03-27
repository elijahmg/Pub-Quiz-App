import {
  Stack,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { STACK_SPACING } from '../../constants';
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
import PrimaryButton from './buttons/primary-button';

// @TODO Rename component/file
export default function QuestionsOverviewQuestion({
  question,
  handleAnswer,
  answer = '',
}: {
  question: string;
  answer?: string;
  handleAnswer: (s: string) => void;
}) {
  const [value, setValue] = useState(answer);
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [isEditable, setIsEditable] = useState(false);
  const toggleEditable = () => {
    setIsEditable((cur) => !cur);
  };
  const saveChange = () => {
    handleAnswer(value);
    toggleEditable();
  };

  useEffect(() => {
    setValue(answer);
  }, [answer]);

  return (
    <Stack spacing={STACK_SPACING}>
      <Text>{question}</Text>
      <InputGroup>
        <Input
          value={value}
          onChange={inputHandler}
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
        <PrimaryButton
          leftIcon={<CheckCircleIcon />}
          size="xs"
          alignSelf="end"
          onClick={saveChange}
        >
          Save change
        </PrimaryButton>
      ) : null}
    </Stack>
  );
}
