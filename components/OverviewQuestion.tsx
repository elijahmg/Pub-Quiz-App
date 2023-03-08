import {
  Stack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { POINTS_OPTIONS, STACK_SPACING } from '../constants';

const ACTIVE_POINTS_COLORS: { [key: number]: string } = {
  0: 'red.100',
  0.5: 'green.100',
  1: 'green.100',
};

const DEFAULT_COLOR = 'brand.900';

export default function OverviewQuestion({
  question,
  answer,
  points,
}: {
  question: string;
  points: number;
  answer?: string;
}) {
  return (
    <Stack spacing={STACK_SPACING}>
      <Text>{question}</Text>
      <InputGroup size="md">
        <Input disabled placeholder="Enter the answer" value={answer} />
        <InputRightElement width="auto" pr={2} gap={2}>
          {POINTS_OPTIONS.map((pointsOption) => (
            <Text
              key={pointsOption}
              color={
                points === pointsOption
                  ? ACTIVE_POINTS_COLORS[pointsOption]
                  : DEFAULT_COLOR
              }
            >
              {`${pointsOption}pct`}
            </Text>
          ))}
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}
