import {
  Text,
  Input,
  InputGroup,
  InputRightElement,
  StackProps,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { POINTS_OPTIONS } from '../../constants';
import { Question } from '../../types';

const ACTIVE_POINTS_COLORS: { [key: number]: string } = {
  0: 'red.100',
  0.5: 'green.100',
  1: 'green.100',
};

const DEFAULT_COLOR = 'brand.900';

interface Props extends StackProps {
  question: Question;
  questionIndex: number;
  answer?: string;
  points?: number;
  onPointsChange?: (points: number) => void;
}

export default function OverviewQuestion({
  question,
  questionIndex,
  answer,
  points,
  onPointsChange,
  ...props
}: Props) {
  const { content } = question;

  const isInteractive = !!onPointsChange;

  const handlePointsItemClick = (points: number) => {
    if (!isInteractive) return;

    onPointsChange(points);
  };

  return (
    <FormControl {...props}>
      <FormLabel>{`Q${questionIndex + 1}: ${content}`}</FormLabel>
      <InputGroup size="lg">
        <Input isReadOnly value={answer} />
        <InputRightElement
          width="auto"
          pr={2}
          gap={2}
          flexDirection="row-reverse"
        >
          {POINTS_OPTIONS.map((pointsOption) => {
            const isActive = points === pointsOption;

            return (
              <Text
                key={pointsOption}
                onClick={() => handlePointsItemClick(pointsOption)}
                fontWeight={isActive ? 'semibold' : undefined}
                color={
                  isActive ? ACTIVE_POINTS_COLORS[pointsOption] : DEFAULT_COLOR
                }
              >
                {`${pointsOption}pct`}
              </Text>
            );
          })}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
