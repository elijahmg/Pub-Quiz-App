import { Flex, Text, TextProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends TextProps {
  children: ReactNode;
}

export default function HighlightHeader({ children, ...props }: Props) {
  return (
    <Text
      as={Flex}
      px={4}
      py={3}
      borderRadius="md"
      bgColor="gray.100"
      fontWeight={600}
      {...props}
    >
      {children}
    </Text>
  );
}
