import { TextProps } from '@chakra-ui/react';
import { ROUNDS } from '../../../mock-data';
import HighlightHeader from './highlight-header';

export default function RoundHead(props: TextProps) {
  return (
    <HighlightHeader {...props}>
      {`Round ${1}: ${ROUNDS[0].name}`}
    </HighlightHeader>
  );
}
