import {
  Stack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  StackProps,
} from '@chakra-ui/react';
import { POINTS_OPTIONS, STACK_SPACING } from '../../constants';

const ACTIVE_POINTS_COLORS: { [key: number]: string } = {
  0: 'red.100',
  0.5: 'green.100',
  1: 'green.100',
};

const DEFAULT_COLOR = 'brand.900';

interface Props extends StackProps {
  question: string;
  points?: number;
  answer?: string;
  onPointsChange?: (points: number) => void;
}

export default function OverviewQuestion({
  question,
  answer,
  points,
  onPointsChange,
  ...props
}: Props) {
  const isInteractive = !!onPointsChange;

  const handlePointsItemClick = (points: number) => {
    if (!isInteractive) return;

    onPointsChange(points);
  };

  return (
    <Stack spacing={STACK_SPACING} {...props}>
      <Text>{question}</Text>
      <InputGroup size="md">
        <Input isReadOnly value={answer} />
        <InputRightElement width="auto" pr={2} gap={2}>
          {POINTS_OPTIONS.map((pointsOption) => (
            <Text
              key={pointsOption}
              color={
                points === pointsOption
                  ? ACTIVE_POINTS_COLORS[pointsOption]
                  : DEFAULT_COLOR
              }
              onClick={() => handlePointsItemClick(pointsOption)}
            >
              {`${pointsOption}pct`}
            </Text>
          ))}
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}
