import { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
  children: ReactNode;
}

export function MainPageWrapper({ children }: Props) {
  return (
    <Flex my={16} flexDirection="column" mx={8}>
      {children}
    </Flex>
  );
}
