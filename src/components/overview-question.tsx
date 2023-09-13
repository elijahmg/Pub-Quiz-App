import { useEffect, useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  StackProps,
  FormControl,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { POINTS_OPTIONS } from '../../constants';
import { QuestionSelection } from '../state/admin/admin-quiz-data.state';

const ACTIVE_POINTS_COLORS: { [key: number]: string } = {
  0: 'red.100',
  0.5: 'yellow.500',
  1: 'green.100',
};

const DEFAULT_COLOR = 'brand.900';

interface Props extends StackProps {
  question: QuestionSelection;
  questionIndex: number;
  answer?: string;
  points: number | null;
  onPointsChange?: (points: number) => void;
}

export default function OverviewQuestion({
  question,
  questionIndex,
  answer,
  points,
  onPointsChange,
}: Props) {
  const { content, answer: correctAnswer } = question;

  const [pointsState, setPointsState] = useState<number | null>(null);

  useEffect(() => {
    setPointsState(points);
  }, [points]);
  //
  const handlePointsItemClick = (points: number) => {
    onPointsChange?.(points);

    setPointsState(points);
  };

  return (
    <FormControl>
      <FormLabel>{`Q${
        questionIndex + 1
      }: ${content} - ${correctAnswer}`}</FormLabel>
      <InputGroup size="lg">
        <Input isReadOnly value={answer} />
        <InputRightElement
          width="auto"
          pr={2}
          gap={2}
          flexDirection="row-reverse"
        >
          {POINTS_OPTIONS.map((pointsOption) => {
            const isActive = pointsState === pointsOption;

            return (
              <Button
                color={
                  isActive ? ACTIVE_POINTS_COLORS[pointsOption] : DEFAULT_COLOR
                }
                onClick={() => handlePointsItemClick(pointsOption)}
                size="xs"
                variant="ghost"
                key={pointsOption}
              >
                {`${pointsOption}pct`}
              </Button>
            );
          })}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
