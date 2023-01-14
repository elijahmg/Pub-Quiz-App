import { Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Header {
  children: ReactNode;
}

export default function Header({ children }: Header) {
  return (
    <Heading as="h1" size="3xl" color="green.100" mb={200}>
      {children}
    </Heading>
  );
}
