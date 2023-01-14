import { Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface SubHeader {
  children: ReactNode;
}

export default function SubHeader({ children }: SubHeader) {
  return (
    <Heading as="h2" textAlign="center" mb={2}>
      {children}
    </Heading>
  );
}
