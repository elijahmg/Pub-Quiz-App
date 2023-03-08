import {
  Stack,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import Constants from '../constants';
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
import PrimaryButton from './buttons/PrimaryButton';

export default function OverviewQuestion({
  question,
  handleAnswer,
  answer = '',
}: {
  question: string;
  answer?: string;
  handleAnswer: (s: string) => void;
}) {
  const [value, setValue] = useState(answer);
  const inputHandler = (e: BaseSyntheticEvent<InputEvent>) => {
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
    <Stack spacing={Constants.StackSpacing}>
      <Text>{question}</Text>
      <InputGroup>
        <Input
          value={value}
          onInput={inputHandler}
          placeholder="Do you think you know the answer?"
        />
        {!isEditable ? (
          <InputRightElement width="80px">
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
