import { Stack, Text, Input, Flex, Checkbox, Select } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { STACK_SPACING } from '../../constants';
import { MediaTypes, StoreQuestion } from '../../types';

interface Props {
  title: string;
  question: StoreQuestion;
  onQuestionChange?: (question: StoreQuestion) => void;
  isReadOnly?: boolean;
}

export default function CreatorQuestion({
  title,
  question,
  onQuestionChange,
  isReadOnly = false,
}: Props) {
  const { content, answer, mediaType, mediaURL } = question;

  const [isMedia, setIsMedia] = useState(!!mediaType);

  const handleToggleIsMedia = () => {
    setIsMedia((currIsMedia) => !currIsMedia);
  };

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuestionChange?.({ ...question, content: e.target.value });
  };

  const handleMediaTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value.toUpperCase() as MediaTypes;

    if (!(value in MediaTypes)) return;

    onQuestionChange?.({ ...question, mediaType: value });
  };

  const handleMediaURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuestionChange?.({ ...question, mediaURL: e.target.value });
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQuestionChange?.({ ...question, answer: e.target.value });
  };

  return (
    <Stack spacing={STACK_SPACING}>
      <Flex justifyContent="space-between">
        <Text>{title}</Text>
        {!isReadOnly && (
          <Checkbox
            size="sm"
            colorScheme="green"
            isChecked={isMedia}
            onChange={handleToggleIsMedia}
          >
            Is it a media file?
          </Checkbox>
        )}
      </Flex>
      <Input
        placeholder="Type in your question"
        value={content}
        onChange={handleContentChange}
        isReadOnly={isReadOnly}
      />
      {isMedia && (
        <>
          <Select
            placeholder="Select media type"
            value={mediaType}
            onChange={handleMediaTypeChange}
            isReadOnly={isReadOnly}
          >
            {Object.values(MediaTypes).map((mediaTypeItem) => (
              <option key={mediaTypeItem} value={mediaTypeItem}>
                {mediaTypeItem.toLowerCase()}
              </option>
            ))}
          </Select>
          <Input
            placeholder="Paste in your link"
            value={mediaURL}
            onChange={handleMediaURLChange}
            isReadOnly={isReadOnly}
          />
        </>
      )}
      <Input
        placeholder="Type in your answer"
        value={answer}
        onChange={handleAnswerChange}
        isReadOnly={isReadOnly}
      />
    </Stack>
  );
}
