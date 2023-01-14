import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SubText {
  children: ReactNode;
}

export default function SubTitle({ children }: SubText) {
  return (
    <Text color="gray.400" align="center">
      {children}
    </Text>
  );
}
