import { TextProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SubText {
  children: ReactNode;
}

export default function SubTitle({ children, ...props }: SubText & TextProps) {
  return <Text color="gray.400">{children}</Text>;
}
